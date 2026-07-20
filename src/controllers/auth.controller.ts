import type { Context } from "elysia";
import {
	createUserSchema,
	getPermanentSessionSchema,
} from "@/models/schema/auth.schema";
import * as authService from "@/services/auth.service";
import { toXml } from "@/utils/xml";

export const createUser = async (ctx: Context) => {
	const input = createUserSchema.parse(ctx.query);

	try {
		const result = await authService.createUser(input);

		return toXml({
			LoginStatusVO: {
				UserId: result.userId,
				LoginToken: result.loginToken,
				Description: "",
			},
		});
	} catch (err) {
		console.error(err);
		if (
			err instanceof Error &&
			err.message === "EMAIL_ALREADY_REGISTERED"
		) {
			return toXml({
				LoginStatusVO: {
					UserId: 0,
					LoginToken: "",
					Description: "You are already registered!",
				},
			});
		}
	}
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
