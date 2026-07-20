import { Elysia } from "elysia";
import * as AuthController from "@/controllers/auth.controller";

export const authRoutes = new Elysia({ prefix: "/auth" })
	.post("/permanent-session", AuthController.GetPermanentSession)
	.post("/login-persona", AuthController.SecureLoginPersona)
	.post("/logout", AuthController.SecureLogout)
	.post("/logout-persona", AuthController.secureLogoutPersona);
