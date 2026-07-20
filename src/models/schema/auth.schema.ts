import { z } from "zod";

const missingCredentials = "Bad Request: no email or password supplied";

/** undefined/null → "" para mensagem Java consistente no min(1). */
const requiredCredential = z.preprocess(
	(val) => (typeof val === "string" ? val : ""),
	z.string().min(1, missingCredentials),
);

export const authenticateUserQuerySchema = z.object({
	email: requiredCredential,
	password: requiredCredential,
});

export const createUserQuerySchema = z.object({
	email: requiredCredential,
	password: requiredCredential,
	inviteTicket: z.string().optional(),
});

export const modernAuthBodySchema = z.object({
	email: requiredCredential,
	password: requiredCredential,
	upgrade: z.boolean().optional(),
});

export const modernRegisterBodySchema = z.object({
	email: requiredCredential,
	password: requiredCredential,
	ticket: z.string().optional(),
});

const requiredPersonaId = z.preprocess(
	(val) => val,
	z.coerce.number({ error: "Bad Request: personaId required" }),
);

export const secureLoginPersonaQuerySchema = z.object({
	personaId: requiredPersonaId,
});

export const secureLogoutPersonaQuerySchema = z.object({
	personaId: requiredPersonaId,
});

export type AuthenticateUserQuery = z.infer<typeof authenticateUserQuerySchema>;
export type CreateUserQuery = z.infer<typeof createUserQuerySchema>;
export type ModernAuthBody = z.infer<typeof modernAuthBodySchema>;
export type ModernRegisterBody = z.infer<typeof modernRegisterBodySchema>;
export type SecureLoginPersonaQuery = z.infer<typeof secureLoginPersonaQuerySchema>;
export type SecureLogoutPersonaQuery = z.infer<typeof secureLogoutPersonaQuerySchema>;
