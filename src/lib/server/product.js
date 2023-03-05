import { database } from '$lib/server/mongodb';

export async function loadProducts() {
	const products = await database.collection('products').find();
	return await products.toArray();
}

export async function getRecommends(baseId) {
	const products = await loadProducts();
	const candidates = products.filter((product) => product.id !== baseId);
	return randomSelect(candidates, 3);
}

// 配列 array から 1 個以上 n 個以下の要素をランダムに抽出する
function randomSelect(array, n) {
	const indices = Array.from({ length: array.length }, (_, i) => i);
	indices.sort(() => Math.random() - 0.5);
	const count = Math.floor(Math.random() * n + 1);
	return Array.from({ length: count }, (_, i) => array[indices[i]]);
}
