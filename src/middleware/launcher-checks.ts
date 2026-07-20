import { eq } from "drizzle-orm";
import { Elysia } from "elysia";
import { db } from "@/database/client";
import { user } from "@/database/migrations/schema";
import { EngineError } from "@/errors/engine.error";
import { env } from "@/env";

/** Espelha LaunchFilter.compareVersions */
export function compareVersions(v1: string, v2: string): number {
	const a = v1.split(".");
	const b = v2.split(".");
	const length = Math.min(a.length, b.length);
	for (let i = 0; i < length; i++) {
		const diff = Number(a[i]) - Number(b[i]);
		if (diff !== 0) return diff < 0 ? -1 : 1;
	}
	return a.length === b.length ? 0 : a.length < b.length ? -1 : 1;
}

/**
 * Espelha @LauncherChecks / LaunchFilter:
 * 1) atualiza HWID se header X-HWID mudou
 * 2) opcionalmente bloqueia launchers fora da whitelist
 */
export const launcherChecksPlugin = new Elysia({ name: "launcher-checks" }).onBeforeHandle(
	async ({ request, query }) => {
		const hwid = request.headers.get("X-HWID") ?? request.headers.get("x-hwid");
		const email =
			typeof query.email === "string"
				? query.email
				: new URL(request.url).searchParams.get("email");

		if (email && hwid) {
			const rows = await db.select().from(user).where(eq(user.email, email)).limit(1);
			const row = rows[0];
			if (row && row.hwid !== hwid) {
				await db.update(user).set({ hwid }).where(eq(user.id, row.id));
			}
		}

		if (!env.ENABLE_WHITELISTED_LAUNCHERS_ONLY) {
			return;
		}

		if (!env.WHITELISTED_LAUNCHERS_ONLY) {
			return;
		}

		let whitelist: Record<string, string>;
		try {
			whitelist = JSON.parse(env.WHITELISTED_LAUNCHERS_ONLY) as Record<string, string>;
		} catch {
			return;
		}

		const xUserAgent = request.headers.get("X-UserAgent") ?? request.headers.get("x-useragent");
		const userAgent =
			request.headers.get("User-Agent") ?? request.headers.get("user-agent") ?? "";

		let lockAccess = false;
		let launcherKind: "SBRW" | "ELECTRON" | "JLAUNCHER";
		let agent = "";

		if (xUserAgent) {
			agent = xUserAgent;
			launcherKind = "SBRW";
		} else if (userAgent) {
			agent = userAgent;
			launcherKind = "ELECTRON";
		} else {
			launcherKind = "JLAUNCHER";
		}

		if (launcherKind === "SBRW") {
			const parts = agent.split(" ");
			const ver = parts[1] ?? "0";
			if (agent.startsWith("LegacyLauncher")) {
				if (compareVersions(ver, whitelist.legacy ?? "0") === -1) lockAccess = true;
			} else if (agent.startsWith("GameLauncherReborn")) {
				if (compareVersions(ver, whitelist.sbrw ?? "0") === -1) lockAccess = true;
			} else if (agent.startsWith("WebLauncher")) {
				if (compareVersions(ver, whitelist.weblauncher ?? "0") === -1) lockAccess = true;
			} else if (agent.startsWith("Horizon")) {
				if (compareVersions(ver, whitelist.horizon ?? "0") === -1) lockAccess = true;
			} else {
				lockAccess = true;
			}
		} else if (launcherKind === "ELECTRON") {
			const ver = agent.split("/")[1] ?? "0";
			if (compareVersions(ver, whitelist.electron ?? "0") === -1) lockAccess = true;
		} else {
			lockAccess = true;
		}

		if (lockAccess) {
			throw new EngineError(
				"You're using the wrong (or unsigned) launcher, please update to the latest one.",
				{ status: 401 },
			);
		}
	},
);
