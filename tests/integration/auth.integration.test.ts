import { describe, expect, test } from "bun:test";
import { app } from "@/index";

const BASE_URL = Bun.env.API_URL || "http://localhost/Engine.svc";

describe("POST /Engine.svc/User/modernRegister", () => {
	test("create an user and return with success message", async () => {
		const response = await app.handle(
			new Request(`${BASE_URL}/User/modernRegister`, {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					email: `test_${Date.now()}@email.com`,
					password: "password123",
				}),
			}),
		);

		const body = await response.json();

		expect(response.status).toBe(200);
		expect(body.message).toBe("Account created! You can now log in.");
	});

	test("reject duplicated email with 400", async () => {
		const email = `duplicado_${Date.now()}@email.com`;
		const payload = JSON.stringify({ email, password: "password123" });

		await app.handle(
			new Request(`${BASE_URL}/User/modernRegister`, {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: payload,
			}),
		);

		const response = await app.handle(
			new Request(`${BASE_URL}/User/modernRegister`, {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: payload,
			}),
		);

		const body = await response.json();
		expect(response.status).toBe(400);
		expect(body.message).toBe("Email already registered");
	});

	test("reject incorrect or incomplete body content", async () => {
		const email = `duplicated_${Date.now()}@email.com`;
		const payload = JSON.stringify({ email });

		await app.handle(
			new Request(`${BASE_URL}/User/modernRegister`, {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: payload,
			}),
		);

		const response = await app.handle(
			new Request(`${BASE_URL}/User/modernRegister`, {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: payload,
			}),
		);

		const body = await response.json();
		expect(response.status).toBe(400);
		expect(body.message).toBe("Bad Request: no email or password supplied");
	});

	test("reject wrong content-type with 415", async () => {
		const response = await app.handle(
			new Request(`${BASE_URL}/User/modernRegister`, {
				method: "POST",
				headers: { "content-type": "text/plain" },
				body: "email=x&password=y",
			}),
		);

		expect(response.status).toBe(415);
	});

	test("GetPermanentSession ");
});
