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

export async function findSession(sessionId) {
	const session = await database.collection('sessions').findOne({ _id: sessionId });
	if (!session) {
		return null;
	}
	if (session.expiresAt < Date.now()) {
		await deleteSession(session._id);
		return null;
	}
	return session;
}

export async function deleteSession(sessionId) {
	await database.collection('sessions').deleteOne({ _id: sessionId });
}
