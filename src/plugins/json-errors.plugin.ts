import { Elysia } from "elysia";
import { EngineError } from "@/errors/engine.error";

/**
 * Erros JSON no formato Java JSONError: { "error": "..." }
 * Usado em modernAuth / modernRegister.
 */
export const jsonErrorsPlugin = new Elysia({ name: "json-errors" }).onError(
	{ as: "scoped" },
	({ error, set }) => {
		const engineError = EngineError.fromUnknown(error);
		// Java modernAuth/modernRegister: AuthException → 400 + JSONError
		set.status = engineError.status === 500 ? 400 : engineError.status;
		set.headers["content-type"] = "application/json; charset=utf-8";
		return { error: engineError.message };
	},
);
