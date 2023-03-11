import { fail } from '@sveltejs/kit';
import { sendPasswordlessLink } from '$lib/server/auth0';

export const actions = {
	default: async ({ cookies, request, url }) => {
		const data = await request.formData();
		const email = data.get('email');

		if (!email) {
			return fail(400, { email, error: 'missing' });
		}
		// 正しいメールアドレスのフォーマットであるかを検査します.
		// この正規表現は簡易版です。実際の業務では必要に応じてより正確な正規表現を使用しましょう。
		if (!/^.+@.+$/.test(email)) {
			return fail(400, { email, error: 'invalid_format' });
		}

		const state = crypto.randomUUID();
		const redirectUri = `${url.origin}/api/auth/callback`;
		await sendPasswordlessLink(email, state, redirectUri);

		cookies.set('state', state, { path: '/' });
		return { success: true };
	}
};
