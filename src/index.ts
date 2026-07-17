import openapi from "@elysia/openapi";
import { Elysia } from "elysia";
import { toXml } from "./utils/xml";

const app = new Elysia()
	.use(openapi())
	.get("/test-attribute", () => {
		return toXml({
			receba: {
				"@_id": "123",
				message: "com atributo",
			},
		});
	})
	.listen(3000);

console.log(`Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
