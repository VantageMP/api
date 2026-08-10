import { drizzle } from "drizzle-orm/mysql2";
import { env } from "@/env";
import { relations } from "./relations";

export const db = drizzle(env.DATABASE_URL, {
	relations,
});
