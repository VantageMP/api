import Elysia from "elysia";
import { authRoutes } from "./auth.routes";

export const apiRoutes = new Elysia({ prefix: "/Engine.svc" }).use(authRoutes);
