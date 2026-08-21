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
		const rawHeaders = headers as Record<string, string | undefined>;
		const rawUserId = rawHeaders.userid ?? rawHeaders.userId ?? rawHeaders.USERID;
		const rawSecurityToken =
			rawHeaders.securitytoken ?? rawHeaders.securityToken ?? rawHeaders.SECURITYTOKEN;

		const numericUserId = Number(rawUserId);
		const session = rawSecurityToken ? await getSession(rawSecurityToken) : null;

		if (!session || !rawSecurityToken || session.userId !== numericUserId) {
			set.status = 401;
			throw new Error("INVALID_OR_EXPIRED_SESSION");
		}

		return {
			userId: session.userId,
			securityToken: rawSecurityToken,
		};
	});
