import * as systemService from "@/services/system.service";

export const systemInformation = async () => {
	const result = await systemService.systemInformation();

	return result;
};
