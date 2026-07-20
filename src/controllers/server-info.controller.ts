import * as serverInfoService from "@/services/server-info.service";

/** GET /Engine.svc/GetServerInformation — JSON (launcher bootstrap) */
export async function getServerInformation() {
	return serverInfoService.getServerInformation();
}
