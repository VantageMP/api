import { getSessionLengthMinutes } from "./parameter.service";

type Session = {
	userId: number;
	loginAt: number;
	lastHeartbeat: number;
	hasActivePersona: boolean;
	activePersonaId: number;
};

const sessions = new Map<string, Session>();

export const createSession = (token: string, userId: number) => {
	const now = Date.now();
	sessions.set(token, {
		userId,
		loginAt: now,
		lastHeartbeat: now,
		hasActivePersona: false,
		activePersonaId: 0,
	});
};

export const getSession = async (token: string): Promise<Session | null> => {
	const session = sessions.get(token);
	if (!session) return null;

	const sessionLengthMs = (await getSessionLengthMinutes()) * 60 * 1000;
	const now = Date.now();

	const expiredAbsolute = now - session.loginAt > sessionLengthMs;

	const inactivityLimitMs = session.hasActivePersona ? 3 * 60 * 1000 : 10 * 60 * 1000;
	const expiredInactivity = now - session.lastHeartbeat > inactivityLimitMs;

	if (expiredAbsolute || expiredInactivity) {
		sessions.delete(token);
		return null;
	}

	return session;
};

export function touchSession(token: string) {
	const session = sessions.get(token);
	if (session) session.lastHeartbeat = Date.now();
}

export const setActivePersona = (token: string, active: boolean) => {
	const session = sessions.get(token);
	if (session) session.hasActivePersona = active;
};

export const setActivePersonaId = (token: string, personaId: number) => {
	const session = sessions.get(token);
	if (session) {
		session.activePersonaId = personaId;
		session.hasActivePersona = personaId !== 0;
	}
};

export const destroySession = (token: string) => {
	sessions.delete(token);
};
