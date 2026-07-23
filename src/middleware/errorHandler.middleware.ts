// middleware/errorHandler.middleware.ts
import { z } from "zod";

type ErrorHandlerParams = {
	error: unknown;
	set: { status?: number | string };
};

export function errorHandler({ error, set }: ErrorHandlerParams) {
	if (error instanceof z.ZodError) {
		set.status = 400;
		return { message: "Bad Request: no email or password supplied" };
	}

	if (error instanceof Error && error.message === "EMAIL_ALREADY_REGISTERED") {
		set.status = 400;
		return { message: "Email already registered" };
	}

	if (error instanceof Error && error.message === "INCORRECT_EMAIL_OR_PASSWORD") {
		set.status = 400;
		return { message: "Wrong e-mail or password" };
	}

	if (error instanceof Error && error.message === "USER_NOT_FOUND") {
		set.status = 400;
		return { message: "This user is not registered in the server" };
	}

	console.error(error);
	set.status = 500;
	return { message: "Internal server error" };
}
