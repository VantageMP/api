import { eq, sql } from "drizzle-orm";
import { db } from "@/database";
import { userTable } from "@/database/schema";
import type { CreateUserInput } from "@/models/schema/auth.schema";
import { hashPassword, verifyPassword } from "@/utils/password";

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

export const authenticateUser = async (input: CreateUserInput) => {
	const user = await db.select().from(userTable).where(eq(userTable.email, input.email));

	const firstUser = user[0];
	if (!firstUser) {
		throw new Error("USER_NOT_FOUND");
	}

	const storedUserPassword: string = firstUser.password;
	const validatePassword = await verifyPassword(input.password, storedUserPassword);

	if (!validatePassword) {
		throw new Error("INCORRECT_EMAIL_OR_PASSWORD");
	}

	return { userId: firstUser.id };
};

export const getPermanentSession = async (_input: { machineID: string; version: number }) => {};

export async function SecureLoginPersona() {}
export async function SecureLogout() {}
export async function secureLogoutPersona() {}

export default getPermanentSession;
