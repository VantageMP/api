import Elysia from "elysia";
import * as systemController from "@/controllers/system.controller";

export const systemRoutes = new Elysia()
	.onBeforeHandle(({ set }) => {
		set.headers["content-type"] = "application/json";
	})
	.get("/GetServerInformation", systemController.systemInformation)
	.get("/ServerInfo/GetServerInformation", systemController.systemInformation)
	.get("/Modding/GetModInfo", systemController.modInfo);
