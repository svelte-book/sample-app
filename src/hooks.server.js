import { findSession } from '$lib/server/session';

export async function handle({ event, resolve }) {
	const sessionId = event.cookies.get('svelte_ec_session');
	event.locals.currentUser = await findSession(sessionId);
	return await resolve(event);
}
