import { Value } from "@sinclair/typebox/value";
import type { Context } from "elysia";
import { createUserSchema } from "@/models/schema/auth.schema";
import * as authService from "@/services/auth.service";

function validateMediaType(ctx: Context) {
	const contentType = ctx.headers["content-type"] ?? "";	
	if (!contentType.includes("application/json")) {
		ctx.set.status = 415;
		return { message: "Unsupported Media Type" };
	}
}

export const createUser = async (ctx: Context) => {
	validateMediaType(ctx);

	const input = Value.Parse(createUserSchema, ctx.body);
	await authService.createUser(input);

	return {
		message: "Account created! You can now log in.",
	};
};

export const authenticateUser = async (ctx: Context) => {
	validateMediaType(ctx);

	const input = Value.Parse(createUserSchema, ctx.body);
	const result = await authService.authenticateUser(input);

	return result;
};

export const getPermanentSession = async (
	ctx: Context & { userId: number; securityToken: string },
) => {
	const result = await authService.getPermanentSession(ctx.userId, ctx.securityToken);

	return XML.stringify(result);
};
