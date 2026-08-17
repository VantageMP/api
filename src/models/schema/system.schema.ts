export interface ServerInformationResponse {
	messageSrv: string;
	homePageUrl: string;
	facebookUrl: string;
	twitterUrl: string;
	discordUrl: string;
	serverName: string;
	country: string;
	timezone: number;
	bannerUrl: string;
	adminList: string;
	ownerList: string;
	secondsToShutDown: number;
	allowedCountries: string;
	activatedHolidaySceneryGroups: string[];
	disactivatedHolidaySceneryGroups: string[];
	requireTicket: boolean;
	webSignupUrl: string;
	webRecoveryUrl: string;
	webPanelUrl: string;
	cashRewardMultiplier: number;
	repRewardMultiplier: number;
	discordApplicationID: string;
	happyHourEnabled: boolean;
	happyHourMultipler: number;
	modernAuthSupport: boolean;
	onlineNumber: number;

	/*
	playerCountRewardMultiplier: number;
	numberOfRegistered: number;
	serverVersion: string;
	*/
}
