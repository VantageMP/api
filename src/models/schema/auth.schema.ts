import { t } from "elysia";

export const createUserSchema = t.Object({
	email: t.String({ format: "email" }),
	password: t.String(),
	// ticket: t.Nullable(t.String()),
});

export const hwidHeaderSchema = t.Object({
	"x-hwid": t.String(),
});

export type CreateUserInput = typeof createUserSchema.static;

export type HwidHeaderInput = typeof hwidHeaderSchema.static;
