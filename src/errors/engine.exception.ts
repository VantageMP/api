export class EngineException extends Error {
	constructor(public readonly code: number) {
		super(`EngineException: ${code}`);
	}
}

export class ModernException extends Error {
	constructor(
		public readonly statusCode: number,
		message: string,
	) {
		super(message);
	}
}
