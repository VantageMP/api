import type { Context } from "elysia";
import { getPermanentSessionSchema } from "@/models/schema/auth.schema";
import * as authService from "@/services/auth.service";
import { toXml } from "@/utils/xml";

export async function GetPermanentSession(ctx: Context) {
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
}

export async function SecureLoginPersona() {}
export async function SecureLogout() {}
export async function secureLogoutPersona() {}
