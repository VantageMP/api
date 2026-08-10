import { Elysia } from "elysia";
import * as authController from "@/controllers/auth.controller";
import { requireAuth } from "@/middleware/auth.middleware";
import { requireJsonContentType } from "@/middleware/jsonContentType.middleware";

export const authRoutes = new Elysia({ prefix: "/User" })
	.group("", (app) =>
		app
			.onBeforeHandle(requireJsonContentType)
			.post("/modernRegister", authController.createUser)
			.post("/modernAuth", authController.authenticateUser),
	)
	.use(requireAuth)
	.post("/GetPermanentSession", authController.getPermanentSession);
