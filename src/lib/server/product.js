import { readFile } from 'fs/promises';

async function loadProducts() {
	const content = await readFile('data/products.json', { encoding: 'utf-8' });
	return JSON.parse(content);
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
