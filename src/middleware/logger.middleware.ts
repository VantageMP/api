import { Elysia } from "elysia";

export const logger = new Elysia({ name: "logger" }).onRequest(({ request }) => {
	const { method } = request;
	const { pathname } = new URL(request.url);
	console.log(`[${new Date().toISOString()}] ${method} ${pathname}`);
});
