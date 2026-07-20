import type { ZodType } from "zod";
import { EngineError } from "@/errors/engine.error";

/** Valida com Zod; falha → EngineError (XML LoginStatusVO no onError). */
export function parseOrThrow<T>(schema: ZodType<T>, data: unknown): T {
	const result = schema.safeParse(data);
	if (!result.success) {
		throw EngineError.fromZod(result.error);
	}
	return result.data;
}
