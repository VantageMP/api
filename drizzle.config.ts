import { defineConfig } from "drizzle-kit";
import { env } from "@/env";

export default defineConfig({
	schema: "./src/database/schema/**",
	out: "./src/database/migrations",
	dialect: "mysql",
	dbCredentials: { url: env.DATABASE_URL },
});
