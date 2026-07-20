import { Elysia } from "elysia";
import * as AuthController from "@/controllers/auth.controller";
import { launcherChecksPlugin } from "@/middleware/launcher-checks";
import { securedPlugin } from "@/middleware/secured";
import {
	authenticateUserQuerySchema,
	createUserQuerySchema,
	modernAuthBodySchema,
	modernRegisterBodySchema,
	secureLoginPersonaQuerySchema,
	secureLogoutPersonaQuerySchema,
} from "@/models/schema/auth.schema";
import { jsonErrorsPlugin } from "@/plugins/json-errors.plugin";
import { xmlErrorsPlugin } from "@/plugins/xml-errors.plugin";
import { parseOrThrow } from "@/utils/validate";

/**
 * Espelha com.soapboxrace.core.api.User
 * Prefixo final: /Engine.svc/User/...
 */
export const authRoutes = new Elysia({ prefix: "/User" })
	// --- legado XML + @LauncherChecks ---
	.group("", (app) =>
		app
			.use(xmlErrorsPlugin)
			.use(launcherChecksPlugin)
			.get("/authenticateUser", (ctx) => {
				const query = parseOrThrow(authenticateUserQuerySchema, {
					email: ctx.query.email,
					password: ctx.query.password,
				});
				return AuthController.authenticateUser(ctx, query);
			})
			.get("/createUser", (ctx) => {
				const query = parseOrThrow(createUserQuerySchema, {
					email: ctx.query.email,
					password: ctx.query.password,
					inviteTicket: ctx.query.inviteTicket,
				});
				return AuthController.createUser(ctx, query);
			}),
	)

	// --- moderno JSON + @LauncherChecks ---
	.group("", (app) =>
		app
			.use(jsonErrorsPlugin)
			.use(launcherChecksPlugin)
			.post("/modernAuth", (ctx) => {
				const body = parseOrThrow(modernAuthBodySchema, ctx.body ?? {});
				return AuthController.modernAuth(ctx, body);
			})
			.post("/modernRegister", (ctx) => {
				const body = parseOrThrow(modernRegisterBodySchema, ctx.body ?? {});
				return AuthController.modernRegister(ctx, body);
			}),
	)

	// --- @Secured XML ---
	.group("", (app) =>
		app
			.use(xmlErrorsPlugin)
			.use(securedPlugin)
			.post("/GetPermanentSession", (ctx) =>
				AuthController.getPermanentSession(ctx),
			)
			.post("/SecureLoginPersona", (ctx) => {
				const query = parseOrThrow(secureLoginPersonaQuerySchema, {
					personaId: ctx.query.personaId,
				});
				return AuthController.secureLoginPersona(ctx, query);
			})
			.post("/SecureLogoutPersona", (ctx) => {
				const query = parseOrThrow(secureLogoutPersonaQuerySchema, {
					personaId: ctx.query.personaId,
				});
				return AuthController.secureLogoutPersona(ctx, query);
			})
			.post("/SecureLogout", (ctx) => AuthController.secureLogout(ctx)),
	);
