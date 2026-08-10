import type { Context } from "elysia";

export function requireJsonContentType({ headers, set }: Context) {
	if (!headers["content-type"]?.includes("application/json")) {
		set.status = 415;
		return { message: "Unsupported Media Type" };
	}
}
