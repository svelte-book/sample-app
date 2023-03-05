import { getRecommends } from '$lib/server/product';
import { json } from '@sveltejs/kit';

export async function GET({ url }) {
	const recommends = await getRecommends(url.searchParams.get('id'));
	return json(recommends);
}
