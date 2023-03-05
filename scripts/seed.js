import { readFile } from 'fs/promises';
import * as dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

dotenv.config();

async function readJSON(filename) {
	const content = await readFile(filename, { encoding: 'utf-8' });
	return JSON.parse(content);
}

async function main() {
	const client = new MongoClient(process.env.MONGODB_URI);
	const database = client.db();

	const productsData = await readJSON('data/products.json');
	for (const product of productsData) {
		console.log(`Seed products/${product.id}`);
		await database
			.collection('products')
			.updateOne({ _id: product.id }, { $set: { ...product, _id: product.id } }, { upsert: true });
	}

	await client.close();
}

main();
