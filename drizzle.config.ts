import { defineConfig } from "drizzle-kit";

export default defineConfig({
	schema: "./src/database/schema/**",
	out: "./src/database/migrations",
	dialect: "mysql",
	dbCredentials: env.DATABASE_URL,
});
