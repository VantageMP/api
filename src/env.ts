import { Value } from "@sinclair/typebox/value";
import { t } from "elysia";

const envSchema = t.Object({
	DATABASE_URL: t.String({ pattern: "^mysql://" }),
});

export const env = Value.Parse(envSchema, Bun.env);
