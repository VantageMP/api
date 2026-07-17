import { drizzle } from "drizzle-orm/mysql2";
import { env } from "../env";
import { schema } from "./schema";

export const db = drizzle(env.DATABASE_URL, {
	schema,
	casing: "snake_case",
});
