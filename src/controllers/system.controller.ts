import * as systemService from "@/services/system.service";

export const systemInformation = async () => {
	const result = await systemService.systemInformation();

	return result;
};

export const modInfo = async ({ set }: { set: { status?: number | string } }) => {
	const result = await systemService.modInfo();

	if (!result) {
		set.status = 404;
		return null;
	}

	return result;
};
