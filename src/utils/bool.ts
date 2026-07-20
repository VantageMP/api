/** Converte bit(1)/Buffer/number do MySQL em boolean. */
export function asBool(value: unknown): boolean {
	if (typeof value === "boolean") return value;
	if (typeof value === "number") return value !== 0;
	if (typeof value === "bigint") return value !== 0n;
	if (typeof Buffer !== "undefined" && Buffer.isBuffer(value)) {
		return value.length > 0 && value[0] !== 0;
	}
	if (typeof value === "string") {
		return value === "1" || value === "true" || value === "\u0001";
	}
	return Boolean(value);
}
