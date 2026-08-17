import Elysia from "elysia";
import { authRoutes } from "./auth.routes";
import { systemRoutes } from "./system.routes";

export const apiRoutes = new Elysia({ prefix: "/Engine.svc" }).use(authRoutes).use(systemRoutes);
