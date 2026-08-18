import { count, inArray } from "drizzle-orm";
import { MODDING_PARAMETER_KEYS, PARAMETER_KEYS } from "@/constants/system.constants";
import { db } from "@/database";
import { onlineUsersTable, parameterTable } from "@/database/schema";
import type { ServerInformationResponse } from "@/models/schema/system.schema";
import { toBool, toFloat, toInt, toList, toStr } from "@/utils/parameter-parsers";

const getParametersMap = async (keys: string[]): Promise<Map<string, string | null>> => {
	const rows = await db
		.select({ name: parameterTable.name, value: parameterTable.value })
		.from(parameterTable)
		.where(inArray(parameterTable.name, keys));
	return new Map(rows.map((row) => [row.name, row.value]));
};

export const systemInformation = async (): Promise<ServerInformationResponse> => {
	const params = await getParametersMap(Object.values(PARAMETER_KEYS));
	const get = (key: string) => params.get(key);
	const [onlineUsers] = await db.select({ count: count() }).from(onlineUsersTable);
	return {
		messageSrv: toStr(get(PARAMETER_KEYS.messageSrv)),
		homePageUrl: toStr(get(PARAMETER_KEYS.homePageUrl)),
		facebookUrl: toStr(get(PARAMETER_KEYS.facebookUrl)),
		twitterUrl: toStr(get(PARAMETER_KEYS.twitterUrl)),
		discordUrl: toStr(get(PARAMETER_KEYS.discordUrl)),
		serverName: toStr(get(PARAMETER_KEYS.serverName)),
		country: toStr(get(PARAMETER_KEYS.country)),
		timezone: toInt(get(PARAMETER_KEYS.timezone)),
		bannerUrl: toStr(get(PARAMETER_KEYS.bannerUrl)),
		adminList: toStr(get(PARAMETER_KEYS.adminList)),
		ownerList: toStr(get(PARAMETER_KEYS.ownerList)),
		secondsToShutDown: toInt(get(PARAMETER_KEYS.secondsToShutDown), 7200),
		allowedCountries: toStr(get(PARAMETER_KEYS.allowedCountries)),
		activatedHolidaySceneryGroups: toList(get(PARAMETER_KEYS.activatedHolidaySceneryGroups)),
		disactivatedHolidaySceneryGroups: toList(get(PARAMETER_KEYS.disactivatedHolidaySceneryGroups)),
		happyHourEnabled: toBool(get(PARAMETER_KEYS.happyHourEnabled)),
		happyHourMultipler: toFloat(get(PARAMETER_KEYS.happyHourMultipler)),
		webSignupUrl: toStr(get(PARAMETER_KEYS.webSignupUrl)),
		webRecoveryUrl: toStr(get(PARAMETER_KEYS.webRecoveryUrl)),
		webPanelUrl: toStr(get(PARAMETER_KEYS.webPanelUrl)),
		cashRewardMultiplier: toFloat(get(PARAMETER_KEYS.cashRewardMultiplier)),
		repRewardMultiplier: toFloat(get(PARAMETER_KEYS.repRewardMultiplier)),
		discordApplicationID: toStr(get(PARAMETER_KEYS.discordApplicationID)),
		modernAuthSupport: toBool(get(PARAMETER_KEYS.modernAuthSupport)),
		requireTicket:
			get(PARAMETER_KEYS.requireTicket) != null && get(PARAMETER_KEYS.requireTicket) !== "",
		onlineNumber: onlineUsers?.count ?? 0,
	};
};

export const modInfo = async () => {
	const params = await getParametersMap(Object.values(MODDING_PARAMETER_KEYS));
	const get = (key: string) => params.get(key);

	const enabled = toBool(get(MODDING_PARAMETER_KEYS.enabled));

	if (!enabled) {
		throw new Error("MODDING_DISABLED");
	}

	return {
		serverID: toStr(get(MODDING_PARAMETER_KEYS.serverID)),
		basePath: toStr(get(MODDING_PARAMETER_KEYS.basePath)),
		features: toList(get(MODDING_PARAMETER_KEYS.features)),
	};
};
