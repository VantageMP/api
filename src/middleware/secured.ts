import { Elysia } from "elysia";
import { EngineError } from "@/errors/engine.error";
import * as tokenStore from "@/services/token-session.store";

/**
 * Equivalente a AuthenticationFilter (@Secured).
 * Headers: userId + securityToken
 */
export const securedPlugin = new Elysia({ name: "secured" }).derive(
	{ as: "scoped" },
	({ request }) => {
		const userIdStr = request.headers.get("userid") ?? request.headers.get("userId");
		const securityToken =
			request.headers.get("securitytoken") ?? request.headers.get("securityToken");

		if (!userIdStr || !securityToken) {
			throw new EngineError("Authorization header must be provided", { status: 401 });
		}

		const userId = Number(userIdStr);
		try {
			const session = tokenStore.validateToken(userId, securityToken);
			return { session, userId };
		} catch {
			// Java: abortWith(Response.status(UNAUTHORIZED).build()) — corpo vazio
			throw new Response(null, { status: 401 });
		}
	},
);
