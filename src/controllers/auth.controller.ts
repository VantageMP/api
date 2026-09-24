import { Value } from "@sinclair/typebox/value";
import {
	type CreateUserInput,
	createUserSchema,
	type HwidHeaderInput,
} from "@/models/schema/auth.schema";
import * as authService from "@/services/auth.service";

export const createUser = async ({
	query,
	headers,
}: {
	query: CreateUserInput;
	headers: HwidHeaderInput;
}) => {
	const hwid = headers["x-hwid"];
	const rawInput = { email: query.email, password: query.password, hwid };
	const input = Value.Parse(createUserSchema, rawInput);

	const userId = await authService.createUser(input);

	return { LoginStatusVO: { UserId: userId } };
};

export const modernCreateUser = async ({
	body,
	headers,
}: {
	body: CreateUserInput;
	headers: HwidHeaderInput;
}) => {
	const hwid = headers["x-hwid"];
	const rawInput = { ...body, hwid };
	const input = Value.Parse(createUserSchema, rawInput);

	await authService.createUser(input);

	return { message: "Account created! You can now log in." };
};

export const authenticateUser = async ({
	query,
	headers,
}: {
	query: CreateUserInput;
	headers: HwidHeaderInput;
}) => {
	const hwid = headers["x-hwid"];
	const rawInput = { ...query, hwid };
	const input = Value.Parse(createUserSchema, rawInput);

	return authService.authenticateUser(input);
};

export const modernAuthenticateUser = async ({
	body,
	headers,
}: {
	body: CreateUserInput;
	headers: HwidHeaderInput;
}) => {
	const whid = headers["x-hwid"];
	const rawInput = { ...body, whid };
	const input = Value.Parse(createUserSchema, rawInput);

	return authService.authenticateUser(input);
};

export const getPermanentSession = async ({
	userId,
	securityToken,
}: {
	userId: number;
	securityToken: string;
}) => {
	return authService.getPermanentSession(userId, securityToken);
};

export const secureLogout = async ({
	userId,
	securityToken,
}: {
	userId: number;
	securityToken: string;
}) => {
	await authService.secureLogout(userId, securityToken);
	return "";
};

export const getFriendList = async ({
	userId,
	securityToken,
}: {
	userId: number;
	securityToken: string;
}) => {
	return authService.getFriendList(userId, securityToken);
};
