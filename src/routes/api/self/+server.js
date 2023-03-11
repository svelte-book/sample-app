import { json } from '@sveltejs/kit';

export async function GET({ locals }) {
	if (!locals.currentUser) {
		return json(null);
	}
	return json({ email: locals.currentUser.email });
}
