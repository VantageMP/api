export const toStr = (value: string | null | undefined, fallback = ""): string => value ?? fallback;

export const toInt = (value: string | null | undefined, fallback = 0): number => {
	const parsed = Number.parseInt(value ?? "", 10);
	return Number.isNaN(parsed) ? fallback : parsed;
};

export const toFloat = (value: string | null | undefined, fallback = 0): number => {
	const parsed = Number.parseFloat(value ?? "");
	return Number.isNaN(parsed) ? fallback : parsed;
};

export const toBool = (value: string | null | undefined): boolean =>
	value === "true" || value === "1";

export const toList = (value: string | null | undefined): string[] =>
	value
		? value
				.split(",")
				.map((item) => item.trim())
				.filter(Boolean)
		: [];
