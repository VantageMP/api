import { Elysia } from "elysia";
import * as authController from "@/controllers/auth.controller";
import { requireJsonContentType } from "@/middleware/jsonContentType.middleware";

export const authRoutes = new Elysia({ prefix: "/User" }).group("", (app) =>
	app
		.onBeforeHandle(requireJsonContentType)
		.post("/modernRegister", authController.createUser)
		.post("/modernAuth", authController.authenticateUser),
);
/* .post("/permanent-session", AuthController.GetPermanentSession)
	.post("/login-persona", AuthController.SecureLoginPersona)
	.post("/logout", AuthController.SecureLogout)
	.post("/logout-persona", AuthController.secureLogoutPersona); */
