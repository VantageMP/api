import Elysia from "elysia";
import * as systemController from "@/controllers/system.controller";

export const systemRoutes = new Elysia().get(
	"/GetServerInformation",
	systemController.systemInformation,
);
