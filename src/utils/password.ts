export async function hashPassword(password: string) {
	const hash = await Bun.password.hash(password, {
		algorithm: "bcrypt",
		cost: 10,
	});

	return hash;
}

export async function verifyPassword(password: string, storedPassword: string) {
	const isMatch: boolean = await Bun.password.verify(password, storedPassword);

	return isMatch;
}
