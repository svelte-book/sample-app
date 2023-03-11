import { json } from '@sveltejs/kit';
import { loadCartItems } from '$lib/server/cart';

export async function GET({ locals }) {
	let cart = [];
	if (locals.currentUser) {
		cart = await loadCartItems(locals.currentUser.userId);
	}
	return json(cart);
}
