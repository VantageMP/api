import { z } from "zod";

export const getPermanentSessionSchema = z.object({
	GetPermanentSessionData: z.object({
		machineID: z.coerce.string(),
		version: z.coerce.number(),
		// os campos @_xmlns e @_xmlns:i vêm junto se você não filtrar --
		// decida se precisa validá-los ou só ignorá-los (Zod ignora extras por padrão se não usar .strict())
	}),
});

export const createUserSchema = z.object({
	email: z.email(),
	password: z.string(),
	// inviteTicket: z.string().nullable(),
});

export type GetPermanentSessionInput = z.infer<typeof getPermanentSessionSchema>;

export type CreateUserInput = z.infer<typeof createUserSchema>;
