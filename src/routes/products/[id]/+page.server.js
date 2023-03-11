import { loadProducts } from '$lib/server/product';
import { addToCart, loadCartItems } from '$lib/server/cart';

async function getProductFromDatabase(productId) {
	const products = await loadProducts();
	return products.find((product) => productId === product.id);
}

async function getRelatedProductsFromDatabase(productId) {
	const products = await loadProducts();
	return products.filter((product) => productId !== product.id);
}

export async function load({ locals, params }) {
	const productId = params.id;
	const product = await getProductFromDatabase(productId);
	const relatedProducts = await getRelatedProductsFromDatabase(productId);
	let cart = [];
	if (locals.currentUser) {
		cart = await loadCartItems(locals.currentUser.userId);
	}

	return { product, relatedProducts, cart };
}

export const actions = {
	default: async ({ locals, request }) => {
		if (locals.currentUser) {
			const data = await request.formData();
			await addToCart(locals.currentUser.userId, data.get('productId'));
		}
	}
};
