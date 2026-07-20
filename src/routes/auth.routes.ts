import { Elysia } from "elysia";
import * as AuthController from "@/controllers/auth.controller";

export const authRoutes = new Elysia({ prefix: "/User" }).get(
	"/createUser",
	AuthController.createUser,
);
/* .post("/permanent-session", AuthController.GetPermanentSession)
	.post("/login-persona", AuthController.SecureLoginPersona)
	.post("/logout", AuthController.SecureLogout)
	.post("/logout-persona", AuthController.secureLogoutPersona); */
