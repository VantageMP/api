import { Elysia, t } from "elysia";
import { getSession } from "@/services/session.store";

export const requireAuth = new Elysia()
	.guard({ as: "scoped" })
	.guard({
		headers: t.Object({
			userid: t.Numeric(),
			securitytoken: t.String({ format: "uuid" }),
		}),
	})
	.resolve({ as: "scoped" }, async ({ headers, set }) => {
		const validatedHeaders = headers as unknown as {
			userid: string;
			securitytoken: string;
		};

		const numericUserId = Number(validatedHeaders.userid);

		const session = await getSession(validatedHeaders.securitytoken);

		console.log("DEBUG numericUserId:", numericUserId, typeof numericUserId);
		console.log("DEBUG session:", session);
		console.log(
			"DEBUG comparison:",
			session?.userId,
			"!==",
			numericUserId,
			"=",
			session?.userId !== numericUserId,
		);

		if (!session || session.userId !== numericUserId) {
			set.status = 401;
			throw new Error("INVALID_OR_EXPIRED_SESSION");
		}

		return {
			userId: session.userId,
			securityToken: validatedHeaders.securitytoken,
		};
	});
