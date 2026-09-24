import { XML } from "bun";
import { type ErrorHandler, NotFoundError, ValidationError } from "elysia";
import { EngineError } from "@/constants/error.codes";
import { EngineException, ModernException } from "@/errors/engine.exception";

type ErrorSet = { status?: number | string; headers: Record<string, string> };

export function errorHandler(ctx: Parameters<ErrorHandler>[0]) {
	const { error, set } = ctx as { error: unknown; set: ErrorSet };

	if (error instanceof ModernException) return handleModernError(error, set);

	if (isAuthError(ctx)) return handleAuthError(set);

	return handleEngineError(error, set);
}

function isAuthError(ctx: Parameters<ErrorHandler>[0]): boolean {
	const { code, error } = ctx as { code: unknown; error: unknown };

	return (
		(error instanceof Error && error.message === "INVALID_OR_EXPIRED_SESSION") ||
		(code === "VALIDATION" && error instanceof ValidationError)
	);
}

function handleModernError(error: ModernException, set: ErrorSet) {
	set.status = error.statusCode;
	set.headers["content-type"] = "application/json";
	return { message: error.message };
}

function handleAuthError(set: ErrorSet) {
	set.status = 401;
	return new Response(null, { status: 401 });
}

function handleEngineError(error: unknown, set: ErrorSet) {
	const isNotFound = error instanceof NotFoundError;
	const isEngine = error instanceof EngineException;

	const code = isNotFound ? EngineError.NOT_FOUND : isEngine ? error.code : -747;

	if (!isEngine && !isNotFound) logUnexpectedError(error);

	set.status = 503;
	set.headers["content-type"] = "application/xml";

	return XML.stringify(buildEngineExceptionXml(code, error));
}

function buildEngineExceptionXml(code: number, error: unknown) {
	const message = error instanceof Error ? error.message : "Unknown error";

	return {
		EngineExceptionTrans: {
			ErrorCode: code,
			InnerException: {
				ErrorCode: code,
				StackTrace: message,
			},
			StackTrace: message,
		},
	};
}

function logUnexpectedError(error: unknown) {
	console.error(
		JSON.stringify({
			level: "ERROR",
			timestamp: new Date().toISOString(),
			message: error instanceof Error ? error.message : "Unknown error",
			stack: error instanceof Error ? error.stack : undefined,
		}),
	);
}
