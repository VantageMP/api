import { Elysia } from "elysia";
import { getSession } from "@/services/session.store";

export const requireAuth = new Elysia().resolve({ as: "scoped" }, async ({ headers, set }) => {
	const token = headers.securitytoken;
	const userId = headers.userid;

	if (!token || !userId) {
		set.status = 401;
		throw new Error("MISSING_AUTH_HEADERS");
	}

	const session = await getSession(token);

	if (!session || session.userId !== Number(userId)) {
		set.status = 401;
		throw new Error("INVALID_OR_EXPIRED_SESSION");
	}

	return { userId: session.userId, securityToken: token };
});
