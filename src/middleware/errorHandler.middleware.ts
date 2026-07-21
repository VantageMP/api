import { z } from "zod";

export function errorHandler({ error, set }: any) {
	if (error instanceof z.ZodError) {
		set.status = 400;
		return { message: "Bad Request: no email or password supplied" };
	}

	if (error instanceof Error && error.message === "EMAIL_ALREADY_REGISTERED") {
		set.status = 400;
		return { message: "Email already registered" };
	}

	console.error(error);
	set.status = 500;
	return { message: "Internal server error" };
}
