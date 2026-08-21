import { type ErrorHandler, NotFoundError, ValidationError } from "elysia";

export function errorHandler(ctx: Parameters<ErrorHandler>[0]) {
	const { code, error, set } = ctx;
	if (code === "NOT_FOUND" || error instanceof NotFoundError) {
		set.status = 404;
		return { message: "Not Found" };
	}

	if (error instanceof ValidationError) {
		set.status = 400;
		return { message: "Bad Request: validation failed" };
	}

	if (error instanceof Error) {
		const knownError = handleKnownBusinessErrors(error.message, set);
		if (knownError) return knownError;
	}

	return handleUnexpectedError(error, set);
}

function handleKnownBusinessErrors(message: string, set: { status?: number | string }) {
	switch (message) {
		case "EMAIL_ALREADY_REGISTERED":
			set.status = 400;
			return { message: "Email already registered" };
		case "INCORRECT_EMAIL_OR_PASSWORD":
			set.status = 400;
			return { message: "Wrong e-mail or password" };
		case "USER_NOT_FOUND":
			set.status = 400;
			return { message: "This user is not registered in the server" };
		case "INVALID_OR_EXPIRED_SESSION":
			set.status = 401;
			return { message: "Invalid or expired session" };
		case "MODDING_DISABLED":
			set.status = 404;
			return { message: "Modding is disabled" };
		default:
			return null;
	}
}

function handleUnexpectedError(error: unknown, set: { status?: number | string }) {
	const errorMessage = error instanceof Error ? error.message : "Unknown error";
	const errorStack = error instanceof Error ? error.stack : undefined;

	console.error(
		JSON.stringify({
			level: "ERROR",
			timestamp: new Date().toISOString(),
			message: errorMessage,
			stack: errorStack,
		}),
	);

	set.status = 500;
	return { message: "Internal server error" };
}
