import { database } from '$lib/server/mongodb';

export async function addToCart(userId, productId) {
	await database.collection('cartItems').insertOne({ userId, productId });
}

export async function loadCartItems(userId) {
	const items = await database.collection('cartItems').find({ userId });
	const productIds = await items.map((item) => item.productId).toArray();
	const products = await database.collection('products').find({ _id: { $in: productIds } });
	return await products.toArray();
}

export async function removeFromCart(userId, productId) {
	await database.collection('cartItems').deleteOne({ userId, productId });
}
