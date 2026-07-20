import { and, count, eq, gt, isNull, or } from "drizzle-orm";
import { db } from "@/database/client";
import { ban, inviteTicket, persona, user } from "@/database/migrations/schema";
import { env } from "@/env";
import { asBool } from "@/utils/bool";
import { AuthError } from "@/errors/engine.error";
import * as tokenStore from "./token-session.store";

function timingSafeEqual(a: string, b: string): boolean {
	const ab = Buffer.from(a, "utf8");
	const bb = Buffer.from(b, "utf8");
	if (ab.length !== bb.length) return false;
	return crypto.timingSafeEqual(ab, bb);
}

/** LegacyPasswordVerifier: compara hash enviado pelo launcher com USER.PASSWORD */
function verifyLegacyPassword(submitted: string, dbHash: string | null): boolean {
	if (!dbHash) return false;
	return timingSafeEqual(submitted, dbHash);
}

/** ModernPasswordVerifier (simplificado com Bun.password / Argon2) */
async function verifyModernPassword(
	plainPassword: string,
	dbHash: string | null,
): Promise<{ ok: boolean; newHash?: string }> {
	if (!dbHash) return { ok: false };

	// Hash SHA1 legado = 40 hex chars
	if (dbHash.length === 40) {
		const hasher = new Bun.CryptoHasher("sha1");
		hasher.update(plainPassword);
		const legacy = hasher.digest("hex");
		if (!timingSafeEqual(legacy, dbHash)) return { ok: false };
		const newHash = await Bun.password.hash(plainPassword, {
			algorithm: "argon2id",
		});
		return { ok: true, newHash };
	}

	const ok = await Bun.password.verify(plainPassword, dbHash);
	return { ok };
}

async function findUserByEmail(email: string) {
	const rows = await db.select().from(user).where(eq(user.email, email)).limit(1);
	return rows[0] ?? null;
}

async function findActiveBan(userId: number) {
	const now = new Date();
	const rows = await db
		.select()
		.from(ban)
		.where(
			and(
				eq(ban.userId, userId),
				eq(ban.active, true),
				or(isNull(ban.endsAt), gt(ban.endsAt, now)),
			),
		)
		.limit(1);
	return rows[0] ?? null;
}

async function loadPersonaIds(userId: number): Promise<number[]> {
	const rows = await db
		.select({ id: persona.id })
		.from(persona)
		.where(eq(persona.userid, userId));
	return rows.map((r) => r.id);
}

/**
 * TokenSessionBO.login — núcleo compartilhado por authenticateUser / modernAuth / createUser
 */
export async function login(
	email: string,
	password: string,
	mode: "legacy" | "modern",
	clientHostIp: string,
): Promise<{ userId: number; token: string }> {
	if (!email) {
		throw new AuthError("Invalid email or password");
	}

	const userRow = await findUserByEmail(email);
	if (!userRow) {
		throw new AuthError("Invalid email or password");
	}

	if (mode === "legacy") {
		if (!verifyLegacyPassword(password, userRow.password)) {
			throw new AuthError("Invalid email or password");
		}
	} else {
		const result = await verifyModernPassword(password, userRow.password);
		if (!result.ok) {
			throw new AuthError("Invalid email or password");
		}
		if (result.newHash) {
			await db.update(user).set({ password: result.newHash }).where(eq(user.id, userRow.id));
		}
	}

	if (env.IS_MAINTENANCE && !asBool(userRow.isAdmin)) {
		throw new AuthError(
			"Server is currently under maintenance. Only administrators can connect.",
		);
	}

	if (asBool(userRow.isLocked)) {
		if (userRow.lastLogin == null) {
			throw new AuthError(
				"Account not activated. Please check your email inbox (including spam folder) to activate your account before playing.",
			);
		}
		throw new AuthError(
			"Account locked. Contact the moderation team via our Discord server for more information.",
		);
	}

	const banRow = await findActiveBan(userRow.id);
	if (banRow) {
		throw new AuthError(banRow.reason ?? "Banned", {
			reason: banRow.reason ?? "Banned",
			expires: banRow.endsAt ? banRow.endsAt.toISOString() : undefined,
		});
	}

	await db.update(user).set({ lastLogin: new Date() }).where(eq(user.id, userRow.id));

	tokenStore.deleteByUserId(userRow.id);
	const personaIds = await loadPersonaIds(userRow.id);
	const token = tokenStore.createToken(
		{
			id: userRow.id,
			premium: asBool(userRow.premium),
			personaIds,
		},
		clientHostIp,
		env.SESSION_LENGTH_MINUTES,
	);

	return { userId: userRow.id, token };
}

export async function authenticateUserLegacy(
	email: string,
	password: string,
	clientHostIp: string,
) {
	if (env.MODERN_AUTH_ENABLED) {
		throw new AuthError(
			"This server requires launcher with Modern Auth support. Please update your launcher.",
		);
	}
	return login(email, password, "legacy", clientHostIp);
}

export async function modernAuth(email: string, password: string, clientHostIp: string) {
	if (!env.MODERN_AUTH_ENABLED) {
		throw new AuthError("Modern Auth not enabled!");
	}
	return login(email, password, "modern", clientHostIp);
}

function isValidEmail(email: string): boolean {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * UserBO.createUser — insert na tabela USER.
 * Campos extras do Java (maxCarSlots, state, social settings) existem na entity JPA
 * mas ainda não estão no schema Drizzle desta pasta; defaults do MySQL cobrem o resto.
 */
async function createUserRow(email: string, passwordHash: string, ip: string) {
	await db.insert(user).values({
		email,
		password: passwordHash,
		ipADDRESS: ip,
		created: new Date(),
		lastLogin: new Date(),
		selectedPersonaIndex: 0,
	});
	const created = await findUserByEmail(email);
	if (!created) {
		throw new AuthError("Failed to create user");
	}
	return created;
}

/**
 * UserBO.createUserWithTicket
 * - valida email
 * - se PARAMETER TICKET_TOKEN não vazio → exige invite ticket válido e não usado
 * - email único
 * - limite de registros por IP
 * - createUser + associa ticket
 */
async function createUserWithTicket(
	email: string,
	passwordHash: string,
	ip: string,
	ticket: string | undefined,
) {
	if (!isValidEmail(email)) {
		throw new AuthError("Invalid email address!");
	}

	// Java: if (!HelpingTools.isNullOrEmptyCheck(ticketToken)) → tickets obrigatórios
	let invite: typeof inviteTicket.$inferSelect | undefined;
	if (env.TICKET_TOKEN.trim() !== "") {
		if (!ticket || ticket.trim() === "") {
			throw new AuthError("Invalid ticket!");
		}
		const tickets = await db
			.select()
			.from(inviteTicket)
			.where(eq(inviteTicket.ticket, ticket))
			.limit(1);
		invite = tickets[0];
		if (!invite?.ticket) throw new AuthError("Invalid ticket!");
		if (invite.userid != null) throw new AuthError("Ticket already used!");
	}

	const existing = await findUserByEmail(email);
	if (existing) throw new AuthError("You're already registered!");

	const [{ value: ipCount } = { value: 0 }] = await db
		.select({ value: count() })
		.from(user)
		.where(eq(user.ipADDRESS, ip));

	if (ipCount >= env.MAX_IP_REGISTRATIONS) {
		throw new AuthError("Registration limit reached for this IP!");
	}

	const created = await createUserRow(email, passwordHash, ip);

	if (invite) {
		// Java: inviteTicketEntity.setUser(userEntity); inviteTicketDAO.insert(...)
		await db
			.update(inviteTicket)
			.set({ userid: created.id })
			.where(eq(inviteTicket.id, invite.id));
	}

	return created;
}

/**
 * User.createUser (API) — registro legado + login imediato.
 * GET /Engine.svc/User/createUser?email=&password=&inviteTicket=
 */
export async function createUserLegacy(
	email: string,
	password: string,
	inviteTicketValue: string | undefined,
	clientHostIp: string,
) {
	if (env.MODERN_AUTH_ENABLED) {
		throw new AuthError(
			"This server requires launcher with Modern Auth support. Please update your launcher.",
		);
	}
	// LegacyPasswordVerifier.createHash() = devolve o hash que o cliente já enviou (SHA1 hex)
	await createUserWithTicket(email, password, clientHostIp, inviteTicketValue);
	return login(email, password, "legacy", clientHostIp);
}

export async function modernRegister(
	email: string,
	password: string,
	ticket: string | undefined,
	clientHostIp: string,
): Promise<{ message: string }> {
	if (env.SERVER_INFO_SIGNUPURL) {
		return {
			message: `In order to create account, please go to ${env.SERVER_INFO_SIGNUPURL}`,
		};
	}
	if (!env.MODERN_AUTH_ENABLED) {
		throw new AuthError("Modern Auth not enabled!");
	}
	const hash = await Bun.password.hash(password, { algorithm: "argon2id" });
	await createUserWithTicket(email, hash, clientHostIp, ticket);
	return { message: "Account created! You can now log in." };
}

export type PersonaProfile = {
	personaId: number;
	name: string | null;
	motto: string | null;
	cash: number;
	boost: number;
	iconIndex: number;
	level: number;
	percentToLevel: number;
	rating: number;
	rep: number;
	repAtCurrentLevel: number;
	score: number;
};

/**
 * User.GetPermanentSession — troca token e monta UserInfo
 */
export async function getPermanentSession(userId: number, clientHostIp: string) {
	if (env.MAX_ONLINE_PLAYERS !== -1) {
		if (tokenStore.onlineSessionCount() >= env.MAX_ONLINE_PLAYERS) {
			throw new AuthError("MaximumUsersLoggedInHardCapReached");
		}
	}

	const userRow = await findUserByEmailById(userId);
	if (!userRow) throw new AuthError("Invalid user");

	const personas = await db.select().from(persona).where(eq(persona.userid, userId));

	tokenStore.deleteByUserId(userId);
	const token = tokenStore.createToken(
		{
			id: userId,
			premium: asBool(userRow.premium),
			personaIds: personas.map((p) => p.id),
		},
		clientHostIp,
		env.SESSION_LENGTH_MINUTES,
	);

	const profiles: PersonaProfile[] = personas.map((p) => ({
		personaId: p.id,
		name: p.name,
		motto: p.motto,
		cash: p.cash,
		boost: p.boost,
		iconIndex: p.iconIndex,
		level: p.level,
		percentToLevel: p.percentToLevel,
		rating: p.rating,
		rep: p.rep,
		repAtCurrentLevel: p.repAtCurrentLevel,
		score: p.score,
	}));

	return {
		securityToken: token,
		userId,
		defaultPersonaIdx: userRow.selectedPersonaIndex ?? 0,
		personas: profiles,
	};
}

async function findUserByEmailById(id: number) {
	const rows = await db.select().from(user).where(eq(user.id, id)).limit(1);
	return rows[0] ?? null;
}

/**
 * SecureLoginPersona
 */
export async function secureLoginPersona(
	session: tokenStore.TokenSession,
	personaId: number,
) {
	if (env.IS_MAINTENANCE) {
		const u = await findUserByEmailById(session.userId);
		if (!u || !asBool(u.isAdmin)) {
			throw new AuthError(
				"Server is currently under maintenance. Only administrators can connect.",
			);
		}
	}

	// TokenSessionBO.setActivePersonaId → verifyPersonaOwnership
	try {
		tokenStore.setActivePersonaId(session, personaId);
	} catch {
		throw new AuthError("RemotePersonaDoesNotBelongToUser");
	}

	const rows = await db.select().from(persona).where(eq(persona.id, personaId)).limit(1);
	const personaRow = rows[0];
	if (!personaRow || personaRow.userid !== session.userId) {
		throw new AuthError("RemotePersonaDoesNotBelongToUser");
	}

	const now = new Date();
	await db
		.update(persona)
		.set({
			lastLogin: now,
			...(personaRow.firstLogin == null ? { firstLogin: now } : {}),
		})
		.where(eq(persona.id, personaId));

	const all = await db
		.select({ id: persona.id })
		.from(persona)
		.where(eq(persona.userid, session.userId));
	const index = all.findIndex((p) => p.id === personaId);
	if (index >= 0) {
		await db.update(user).set({ selectedPersonaIndex: index }).where(eq(user.id, session.userId));
	}
}

export function secureLogoutPersona(session: tokenStore.TokenSession, personaId: number) {
	if (personaId === session.activePersonaId) {
		// presenceBO / matchmakingBO — stub até portar Redis
	}
	tokenStore.setActivePersonaId(session, 0);
}

export function secureLogout(session: tokenStore.TokenSession) {
	if (session.activePersonaId && session.activePersonaId !== 0) {
		tokenStore.setActivePersonaId(session, 0);
	}
	tokenStore.deleteByUserId(session.userId);
}
