import { XML } from "bun";
import { eq, sql } from "drizzle-orm";
import { db } from "@/database";
import { personaTable, userTable } from "@/database/schema";
import type { CreateUserInput } from "@/models/schema/auth.schema";
import { hashPassword, verifyPassword } from "@/utils/password";
import { formatJavaDouble } from "@/utils/xml";
import { createSession, destroySession } from "./session.store";

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

	const sessionToken: string = Bun.randomUUIDv7();
	createSession(sessionToken, firstUser.id);

	return { userId: firstUser.id, token: sessionToken };
};

export const getPermanentSession = async (userId: number, currentToken: string) => {
	const [user] = await db.select().from(userTable).where(eq(userTable.id, userId));

	if (!user) {
		throw new Error("USER_NOT_FOUND");
	}

	const newToken = Bun.randomUUIDv7();
	createSession(newToken, userId);
	destroySession(currentToken);

	const personas = await db.select().from(personaTable).where(eq(personaTable.userid, userId));

	const returnedUser = {
		UserInfo: {
			defaultPersonaIdx: user.selectedPersonaIndex ?? 0,
			personas: {
				ProfileData: personas.map((persona) => ({
					Boost: formatJavaDouble(persona.boost),
					Cash: formatJavaDouble(persona.cash),
					IconIndex: persona.iconIndex,
					Level: persona.level,
					Name: persona.name,
					PercentToLevel: formatJavaDouble(persona.percentToLevel),
					PersonaId: persona.id,
					Rating: formatJavaDouble(persona.rating),
					Rep: formatJavaDouble(persona.rep),
					RepAtCurrentLevel: persona.repAtCurrentLevel,
					Score: persona.score,
				})),
			},
			user: {
				fullGameAccess: false,
				isComplete: false,
				remoteUserId: 0,
				securityToken: newToken,
				subscribeMsg: false,
				userId: user.id,
			},
		},
	};

	return returnedUser;
};
