import { Elysia } from "elysia";
import * as ServerInfoController from "@/controllers/server-info.controller";

export const serverInfoRoutes = new Elysia().get(
	"/GetServerInformation",
	ServerInfoController.getServerInformation,
);
