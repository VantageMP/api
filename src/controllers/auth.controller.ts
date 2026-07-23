import type { Context } from "elysia";
import { createUserSchema, getPermanentSessionSchema } from "@/models/schema/auth.schema";
import * as authService from "@/services/auth.service";
import { toXml } from "@/utils/xml";

function validateMediaType(ctx: Context) {
	const contentType = ctx.headers["content-type"] ?? "";

	if (!contentType.includes("application/json")) {
		ctx.set.status = 415;
		return { message: "Unsupported Media Type" };
	}
}

export const createUser = async (ctx: Context) => {
	validateMediaType(ctx);
	const input = createUserSchema.parse(ctx.body);
	await authService.createUser(input);

	return {
		message: "Account created! You can now log in.",
	};
};

export const authenticateUser = async (ctx: Context) => {
	validateMediaType(ctx);
	const input = createUserSchema.parse(ctx.body);

	const result = await authService.authenticateUser(input);

	const sessionToken: string = Bun.randomUUIDv7();

	return {
		userId: result.userId,
		token: sessionToken,
	};
};

export const GetPermanentSession = async (ctx: Context) => {
	const parsed = getPermanentSessionSchema.parse(ctx.body);
	const { machineID, version } = parsed.GetPermanentSessionData;

	const result = await authService.getPermanentSession({
		machineID,
		version,
	});

	return toXml({
		UserInfo: {
			defaultPersonaIdx: result.defaultPersonaIdx,
			personas: {
				ProfileData: result.personas.map((p) => ({
					Boost: p.boost,
					Cash: p.cash,
					IconIndex: p.iconIndex,
					Level: p.level,
					Name: p.name,
					PercentToLevel: p.percentToLevel,
					PersonaId: p.personaId,
					Rating: p.rating,
					Rep: p.rep,
					RepAtCurrentLevel: p.repAtCurrentLevel,
					Score: p.score,
				})),
			},
		},
	});
};

export async function SecureLoginPersona() {}
export async function SecureLogout() {}
export async function secureLogoutPersona() {}
