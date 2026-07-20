import { Elysia } from "elysia";
import { authRoutes } from "./auth.routes";
import { serverInfoRoutes } from "./server-info.routes";


export const apiRoutes = new Elysia({ prefix: "/Engine.svc" })
	.onAfterHandle(({ set }) => {
		// HttpHeaderFilter Java: Connection: close
		set.headers["Connection"] = "close";
	})
	.use(serverInfoRoutes)
	.use(authRoutes);
