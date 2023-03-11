import { database } from '$lib/server/mongodb';

const expiresIn = 30 * 60 * 1000; // 30分

export async function createSession(data) {
	const sessionId = crypto.randomUUID();
	const session = {
		_id: sessionId,
		expiresAt: Date.now() + expiresIn,
		...data
	};
	await database.collection('sessions').insertOne(session);
	return sessionId;
}
