import { addToCart, loadCartItems, removeFormCart } from '$lib/server/cart';

export async function load({ locals }) {
	let cart = [];
	if (locals.currentUser) {
		cart = await loadCartItems(locals.currentUser.userId);
	}
	return { cart };
}

export const actions = {
	add: async ({ locals, request }) => {
		if (locals.currentUser) {
			const data = await request.formData();
			await addToCart(locals.currentUser.userId, data.get('productId'));
		}
	},
	remove: async ({ locals, request }) => {
		if (locals.currentUser) {
			const data = await request.formData();
			await removeFormCart(locals.currentUser.userId, data.get('productId'));
		}
	}
};
