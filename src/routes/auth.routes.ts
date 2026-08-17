import Elysia from "elysia";
import * as authController from "@/controllers/auth.controller";
import { requireAuth } from "@/middleware/auth.middleware";
import { requireJsonContentType } from "@/middleware/jsonContentType.middleware";
import { createUserSchema, hwidHeaderSchema } from "@/models/schema/auth.schema";

export const authRoutes = new Elysia({ prefix: "/User" })
	.group("", (app) =>
		app
			.onBeforeHandle(requireJsonContentType)
			.post(
				"/modernRegister",
				({ body, headers }) => authController.modernCreateUser({ body, headers }),
				{
					body: createUserSchema,
					headers: hwidHeaderSchema,
				},
			)
			.post(
				"/modernAuth",
				({ body, headers }) => authController.modernAuthenticateUser({ body, headers }),
				{ body: createUserSchema, headers: hwidHeaderSchema },
			),
	)
	.get("/createUser", ({ query, headers }) => authController.createUser({ query, headers }), {
		query: createUserSchema,
		headers: hwidHeaderSchema,
	})
	.get(
		"/authenticateUser",
		({ query, headers }) => authController.authenticateUser({ query, headers }),
		{
			query: createUserSchema,
			headers: hwidHeaderSchema,
		},
	)
	.use(requireAuth)
	.post("/GetPermanentSession", ({ userId, securityToken }) =>
		authController.getPermanentSession({ userId, securityToken }),
	);
