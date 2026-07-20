import { z } from "zod";

const envSchema = z.object({
	DATABASE_URL: z.url().startsWith("mysql://"),
	/** Porta HTTP (launcher Java default: 8080) */
	PORT: z.coerce.number().default(8080),
	/** Espelha PARAMETER.MODERN_AUTH_ENABLED */
	MODERN_AUTH_ENABLED: z
		.enum(["true", "false"])
		.default("false")
		.transform((v) => v === "true"),
	/** Espelha PARAMETER.IS_MAINTENANCE */
	IS_MAINTENANCE: z
		.enum(["true", "false"])
		.default("false")
		.transform((v) => v === "true"),
	SESSION_LENGTH_MINUTES: z.coerce.number().default(130),
	MAX_ONLINE_PLAYERS: z.coerce.number().default(-1),
	MAX_IP_REGISTRATIONS: z.coerce.number().default(5),
	TICKET_TOKEN: z.string().default(""),
	SERVER_INFO_SIGNUPURL: z.string().default(""),
	/** Espelha PARAMETER.ENABLE_WHITELISTED_LAUNCHERS_ONLY */
	ENABLE_WHITELISTED_LAUNCHERS_ONLY: z
		.enum(["true", "false"])
		.default("false")
		.transform((v) => v === "true"),
	/** JSON string espelhando WHITELISTED_LAUNCHERS_ONLY (só se whitelist ligada) */
	WHITELISTED_LAUNCHERS_ONLY: z.string().default(""),
	SERVER_INFO_NAME: z.string().default("SBRW Bun Dev"),
	SERVER_INFO_COUNTRY: z.string().default("BR"),
	SERVER_INFO_MESSAGE: z.string().default(""),
	SERVER_INFO_HOMEPAGE_URL: z.string().default(""),
	SERVER_INFO_DISCORD_URL: z.string().default(""),
	SERVER_INFO_BANNER_URL: z.string().default(""),
	SERVER_INFO_TIMEZONE: z.coerce.number().default(0),
});

export const env = envSchema.parse(Bun.env);
