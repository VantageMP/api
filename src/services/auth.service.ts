import { sql } from "drizzle-orm";
import { db } from "@/database/client";
import { userTable } from "@/database/migrations/schema";
import type { CreateUserInput } from "@/models/schema/auth.schema";
import { hashPassword } from "@/utils/password";

export const createUser = async (input: CreateUserInput) => {
	const newUserData = {
		email: input.email,
		password: await hashPassword(input.password),
	};

	const newUser = await db
		.insert(userTable)
		.values(newUserData)
		.onDuplicateKeyUpdate({ set: { id: sql`id` } });

	if (newUser[0].insertId === 0) {
		throw new Error("EMAIL_ALREADY_REGISTERED");
	}
};

export const authenticateUser = async (input: CreateUserInput) => {};

export const getPermanentSession = async (_input: { machineID: string; version: number }) => {};

export async function SecureLoginPersona() {}
export async function SecureLogout() {}
export async function secureLogoutPersona() {}

export default getPermanentSession;
