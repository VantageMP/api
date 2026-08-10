import type { Context } from "elysia";
import { touchSession } from "@/services/session.store";

export const heartbeat = async (ctx: Context) => {
	touchSession(ctx.sessionToken);
	return {};
};
