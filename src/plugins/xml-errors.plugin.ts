import { Elysia } from "elysia";
import { EngineError } from "@/errors/engine.error";

/**
 * Qualquer erro na API Engine vira LoginStatusVO XML (launcher).
 */
export const xmlErrorsPlugin = new Elysia({ name: "xml-errors" }).onError(
	{ as: "scoped" },
	({ error, set }) => {
		// Ex.: AuthenticationFilter abortWith(401) — corpo vazio
		if (error instanceof Response) {
			set.status = error.status;
			return error;
		}
		const engineError = EngineError.fromUnknown(error);
		set.status = engineError.status;
		return engineError.toResponse();
	},
);
