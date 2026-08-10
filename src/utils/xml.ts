export function formatJavaDouble(value: number): string {
	if (Number.isInteger(value)) {
		return `${value}.0`;
	}
	return `${value}`;
}
