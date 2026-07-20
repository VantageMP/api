/**
 * Equivalente a TokenSessionBO (sessão em memória).
 * Java: sessionKeyToTokenMap + userIdToSessionKeyMap
 */

export type TokenSession = {
	securityToken: string;
	userId: number;
	premium: boolean;
	clientHostIp: string;
	activePersonaId: number;
	allowedPersonaIds: number[];
	expirationDate: Date;
	lastHeartbeatTime: number;
	eventSessionId: number | null;
	activeLobbyId: number | null;
};

const sessionKeyToToken = new Map<string, TokenSession>();
const userIdToSessionKey = new Map<number, string>();

export function createToken(
	user: { id: number; premium: boolean; personaIds: number[] },
	clientHostIp: string,
	sessionLengthMinutes: number,
): string {
	const securityToken = crypto.randomUUID();
	const expirationDate = new Date(Date.now() + sessionLengthMinutes * 60_000);

	const session: TokenSession = {
		securityToken,
		userId: user.id,
		premium: user.premium,
		clientHostIp,
		activePersonaId: 0,
		allowedPersonaIds: [...user.personaIds],
		expirationDate,
		lastHeartbeatTime: Date.now(),
		eventSessionId: null,
		activeLobbyId: null,
	};

	// deleteByUserId implícito: uma sessão por user
	const oldKey = userIdToSessionKey.get(user.id);
	if (oldKey) sessionKeyToToken.delete(oldKey);

	sessionKeyToToken.set(securityToken, session);
	userIdToSessionKey.set(user.id, securityToken);
	return securityToken;
}

export function deleteByUserId(userId: number): void {
	const key = userIdToSessionKey.get(userId);
	if (!key) return;
	userIdToSessionKey.delete(userId);
	sessionKeyToToken.delete(key);
}

export function validateToken(userId: number, securityToken: string): TokenSession {
	const session = sessionKeyToToken.get(securityToken);
	if (!session || session.userId !== userId) {
		throw new Error("Invalid Token");
	}
	if (Date.now() > session.expirationDate.getTime()) {
		deleteByUserId(userId);
		throw new Error(`Expired Token as of ${session.expirationDate.toISOString()}`);
	}
	return session;
}

export function getSessionByUserId(userId: number): TokenSession | undefined {
	const key = userIdToSessionKey.get(userId);
	if (!key) return undefined;
	return sessionKeyToToken.get(key);
}

export function setActivePersonaId(session: TokenSession, personaId: number): void {
	if (personaId !== 0 && !session.allowedPersonaIds.includes(personaId)) {
		throw new Error("RemotePersonaDoesNotBelongToUser");
	}
	session.activePersonaId = personaId;
}

export function onlineSessionCount(): number {
	return sessionKeyToToken.size;
}
