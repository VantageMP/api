import { toXml } from "@/utils/xml";
import { ZodError } from "zod";

export type EngineBanInfo = {
	reason: string;
	expires?: string;
};

/**
 * Erro de domínio da API Engine (launcher).
 * Sempre serializa para LoginStatusVO XML — formato que o launcher espera.
 */
export class EngineError extends Error {
	readonly status: number;
	readonly ban?: EngineBanInfo;

	constructor(message: string, options?: { status?: number; ban?: EngineBanInfo }) {
		super(message);
		this.name = "EngineError";
		this.status = options?.status ?? 500;
		this.ban = options?.ban;
	}

	/** Payload XML (objeto) no formato LoginStatusVO do Java. */
	toLoginStatusPayload(): Record<string, unknown> {
		const loginStatus: Record<string, unknown> = {
			UserId: 0,
			LoginToken: "",
		};

		if (this.ban) {
			loginStatus.Ban = {
				Reason: this.ban.reason,
				...(this.ban.expires ? { Expires: this.ban.expires } : {}),
			};
		} else {
			loginStatus.Description = this.message;
		}

		return { LoginStatusVO: loginStatus };
	}

	toResponse(): Response {
		return toXml(this.toLoginStatusPayload(), this.status);
	}

	static fromZod(error: ZodError): EngineError {
		const first = error.issues[0];
		const message = first?.message ?? "Bad Request";
		return new EngineError(message, { status: 500 });
	}

	static fromUnknown(error: unknown): EngineError {
		if (error instanceof EngineError) return error;
		if (error instanceof ZodError) return EngineError.fromZod(error);
		if (error instanceof Error && error.message) {
			return new EngineError(error.message, { status: 500 });
		}
		return new EngineError("Internal Server Error", { status: 500 });
	}
}

/** Compatível com throws antigos: `new AuthError(msg)` / `new AuthError(msg, ban)`. */
export class AuthError extends EngineError {
	constructor(message: string, ban?: EngineBanInfo) {
		super(message, { status: 500, ban });
		this.name = "AuthError";
	}
}
