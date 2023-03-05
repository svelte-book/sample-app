import { readFile } from 'fs/promises';

async function loadProducts() {
	const content = await readFile('data/products.json', { encoding: 'utf-8' });
	return JSON.parse(content);
}

async function getProductFromDatabase(productId) {
	const products = await loadProducts();
	return products.find((product) => productId === product.id);
}

async function getRelatedProductsFromDatabase(productId) {
	const products = await loadProducts();
	return products.filter((product) => productId !== product.id);
}

export async function load({ params }) {
	const productId = params.id;
	const product = await getProductFromDatabase(productId);
	const relatedProducts = await getRelatedProductsFromDatabase(productId);

	return { product, relatedProducts };
}
