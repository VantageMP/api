import openapi from "@elysia/openapi";
import { Elysia } from "elysia";
import { errorHandler } from "./middleware/errorHandler.middleware";
import { apiRoutes } from "./routes/index.routes";
import { fromXml } from "./utils/xml";

const app = new Elysia()
	.use(openapi())
	.onError(errorHandler)
	.onParse(async ({ request, headers }) => {
		const contentType = headers["content-type"] ?? "";
		if (contentType.includes("application/xml") || contentType.includes("text/xml")) {
			const rawText = await request.text();
			return fromXml(rawText);
		}
	})
	.use(apiRoutes)
	.listen(3000);

console.log(`Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
