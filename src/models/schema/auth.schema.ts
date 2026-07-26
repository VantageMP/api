import { t } from "elysia";

export const getPermanentSessionSchema = t.Object({
	GetPermanentSessionData: t.Object({
		machineID: t.String(),
		version: t.Numeric(),
	}),
});

export const createUserSchema = t.Object({
	email: t.String({ format: "email" }),
	password: t.String(),
	// ticket: t.Nullable(t.String()),
});

export type GetPermanentSessionInput = typeof getPermanentSessionSchema.static;

export type CreateUserInput = typeof createUserSchema.static;
