import { Elysia } from "elysia";

function formatLogMessage(request: Request, status: number): string {
	const { method, url } = request;
	const { pathname } = new URL(url);
	const timestamp = new Date().toISOString();

	return `[${timestamp}] ${status} - ${method} ${pathname}`;
}

export const logger = new Elysia({ name: "logger" }).onAfterResponse(
	{ as: "global" },
	({ request, set, response }) => {
		const isResponseObj = response instanceof Response;
		const status = (isResponseObj ? response.status : set.status) ?? 200;

		console.log(formatLogMessage(request, status as number));
	},
);
