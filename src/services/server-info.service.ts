import { count } from "drizzle-orm";
import { db } from "@/database/client";
import { user } from "@/database/migrations/schema";
import { env } from "@/env";
import { onlineSessionCount } from "@/services/token-session.store";

/**
 * Espelha GetServerInformationBO.getServerInformation()
 * Campos mínimos que o launcher lê no bootstrap.
 */
export async function getServerInformation() {
	const [{ value: registered } = { value: 0 }] = await db
		.select({ value: count() })
		.from(user);

	return {
		messageSrv: env.SERVER_INFO_MESSAGE,
		homePageUrl: env.SERVER_INFO_HOMEPAGE_URL,
		facebookUrl: "",
		twitterUrl: "",
		discordUrl: env.SERVER_INFO_DISCORD_URL,
		serverName: env.SERVER_INFO_NAME,
		country: env.SERVER_INFO_COUNTRY,
		timezone: env.SERVER_INFO_TIMEZONE,
		bannerUrl: env.SERVER_INFO_BANNER_URL,
		adminList: "",
		ownerList: "",
		numberOfRegistered: registered,
		secondsToShutDown: 9999999,
		allowedCountries: "",
		activatedHolidaySceneryGroups: ["SCENERY_GROUP_NORMAL"],
		disactivatedHolidaySceneryGroups: ["SCENERY_GROUP_NORMAL_DISABLE"],
		onlineNumber: onlineSessionCount(),
		requireTicket: env.TICKET_TOKEN.trim() !== "",
		playerCountRewardMultiplier: 1.0,
		webSignupUrl: env.SERVER_INFO_SIGNUPURL,
		webRecoveryUrl: "",
		webPanelUrl: "",
		cashRewardMultiplier: 1.0,
		repRewardMultiplier: 1.0,
		discordApplicationID: "",
		happyHourEnabled: false,
		happyHourMultipler: 1.0,
		serverVersion: "bun-rewrite - 0.1.0",
		modernAuthSupport: env.MODERN_AUTH_ENABLED,
	};
}
