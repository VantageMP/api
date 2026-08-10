import { eq } from "drizzle-orm";
import { db } from "@/database";
import { parameterTable } from "@/database/schema";

let cachedSessionLengthMinutes: number | null = null;

export const getSessionLengthMinutes = async (): Promise<number> => {
	if (cachedSessionLengthMinutes !== null) {
		return cachedSessionLengthMinutes;
	}

	const result = await db
		.select()
		.from(parameterTable)
		.where(eq(parameterTable.name, "SESSION_LENGTH_MINUTES"));

	const value = result[0]?.value;
	cachedSessionLengthMinutes = value ? Number(value) : 130;

	return cachedSessionLengthMinutes;
};
