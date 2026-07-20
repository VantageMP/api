import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2";
import { env } from "@/env";
import { relations } from "./migrations/relations";

const url = new URL(env.DATABASE_URL);

// drizzle-orm/mysql2 aceita pool callback (usa .promise() internamente) e client.config
const pool = mysql.createPool({
	host: url.hostname,
	port: Number(url.port || 3306),
	user: decodeURIComponent(url.username),
	password: decodeURIComponent(url.password),
	database: url.pathname.replace(/^\//, ""),
	connectionLimit: 10,
	supportBigNumbers: true,
});

export const db = drizzle({
	client: pool,
	relations,
});
