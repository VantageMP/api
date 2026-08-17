import openapi from "@elysia/openapi";
import { XML } from "bun";
import Elysia from "elysia";
import { errorHandler } from "./middleware/errorHandler.middleware";
import { logger } from "./middleware/logger.middleware";
import { apiRoutes } from "./routes/index.routes";

export const app = new Elysia()
	.use(openapi())
	.use(logger)
	.onError(errorHandler)
	.onParse(async ({ request, headers }) => {
		const contentType = headers["content-type"] ?? "";
		if (contentType.includes("application/xml") || contentType.includes("text/xml")) {
			const rawText = await request.text();
			return XML.parse(rawText);
		}
	})
	.use(apiRoutes)
	.listen(3000);

console.log(`Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
