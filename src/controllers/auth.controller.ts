import type { Context } from "elysia";
import type {
	AuthenticateUserQuery,
	CreateUserQuery,
	ModernAuthBody,
	ModernRegisterBody,
	SecureLoginPersonaQuery,
	SecureLogoutPersonaQuery,
} from "@/models/schema/auth.schema";
import * as authService from "@/services/auth.service";
import type { TokenSession } from "@/services/token-session.store";
import { toXml } from "@/utils/xml";

function clientIp(request: Request): string {
	return (
		request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
		request.headers.get("x-real-ip") ||
		"127.0.0.1"
	);
}

/** LoginStatusVO — mesmo XML do Java (authenticateUser / createUser) */
function loginStatusOk(userId: number, token: string) {
	return toXml({
		LoginStatusVO: {
			UserId: userId,
			LoginToken: token,
		},
	});
}

/** Resposta vazia application/xml (SecureLogin/Logout*) */
function emptyXml() {
	return new Response("", {
		status: 200,
		headers: { "content-type": "application/xml; charset=utf-8" },
	});
}

type RequestCtx = Pick<Context, "request">;
type SecuredContext = RequestCtx & { session: TokenSession; userId: number };

/** GET User/authenticateUser */
export async function authenticateUser(ctx: RequestCtx, query: AuthenticateUserQuery) {
	const result = await authService.authenticateUserLegacy(
		query.email,
		query.password,
		clientIp(ctx.request),
	);
	return loginStatusOk(result.userId, result.token);
}

/** GET User/createUser */
export async function createUser(ctx: RequestCtx, query: CreateUserQuery) {
	const result = await authService.createUserLegacy(
		query.email,
		query.password,
		query.inviteTicket,
		clientIp(ctx.request),
	);
	return loginStatusOk(result.userId, result.token);
}

/** POST User/modernAuth → JSON { userId, token } */
export async function modernAuth(ctx: RequestCtx, body: ModernAuthBody) {
	const result = await authService.modernAuth(
		body.email,
		body.password,
		clientIp(ctx.request),
	);
	return { userId: result.userId, token: result.token };
}

/** POST User/modernRegister → JSON { message } */
export async function modernRegister(ctx: RequestCtx, body: ModernRegisterBody) {
	const result = await authService.modernRegister(
		body.email,
		body.password,
		body.ticket,
		clientIp(ctx.request),
	);
	return { message: result.message };
}

/**
 * POST User/GetPermanentSession → UserInfo XML
 * Ordem JAXB: defaultPersonaIdx, personas, user
 */
export async function getPermanentSession(ctx: SecuredContext) {
	const result = await authService.getPermanentSession(
		ctx.userId,
		clientIp(ctx.request),
	);

	// UserBO.getUserInfo: Name, Cash, Boost, IconIndex, PersonaId, Level
	// (+ campos extras do ProfileData que o JAXB serializa com defaults)
	const profileData = result.personas.map((p) => ({
		Boost: p.boost,
		Cash: p.cash,
		IconIndex: p.iconIndex,
		Level: p.level,
		Motto: p.motto ?? "",
		Name: p.name ?? "",
		PercentToLevel: p.percentToLevel,
		PersonaId: p.personaId,
		Rating: p.rating,
		Rep: p.rep,
		RepAtCurrentLevel: p.repAtCurrentLevel,
		Score: p.score,
	}));

	return toXml({
		UserInfo: {
			defaultPersonaIdx: result.defaultPersonaIdx,
			personas: {
				...(profileData.length === 0
					? {}
					: {
							ProfileData:
								profileData.length === 1 ? profileData[0] : profileData,
						}),
			},
			user: {
				securityToken: result.securityToken,
				userId: result.userId,
			},
		},
	});
}

/** POST User/SecureLoginPersona?personaId= */
export async function secureLoginPersona(
	ctx: SecuredContext,
	query: SecureLoginPersonaQuery,
) {
	await authService.secureLoginPersona(ctx.session, query.personaId);
	return emptyXml();
}

/** POST User/SecureLogoutPersona?personaId= */
export async function secureLogoutPersona(
	ctx: SecuredContext,
	query: SecureLogoutPersonaQuery,
) {
	authService.secureLogoutPersona(ctx.session, query.personaId);
	return emptyXml();
}

/** POST User/SecureLogout */
export async function secureLogout(ctx: SecuredContext) {
	authService.secureLogout(ctx.session);
	return emptyXml();
}
