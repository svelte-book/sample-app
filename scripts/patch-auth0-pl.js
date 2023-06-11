import https from 'https';

// 以下のWikiページを参考に、Auth0管理画面から取得した情報を __PLACEHOLDER__ 部分に貼り付けてください。
// https://github.com/svelte-book/sample-app/wiki/auth0#passwordless-workaround
const AUTH0_DOMAIN = '__PLACEHOLDER__';
const AUTH0_TOKEN = '__PLACEHOLDER__';

const postData = JSON.stringify({
	universal_login: {
		passwordless: {
			allow_magiclink_verify_without_session: true
		}
	}
});

const options = {
	hostname: AUTH0_DOMAIN,
	path: '/api/v2/tenants/settings',
	method: 'PATCH',
	headers: {
		'Content-Type': 'application/json',
		'Content-Length': Buffer.byteLength(postData),
		'Authorization': `Bearer ${AUTH0_TOKEN}`
	}
};

const req = https.request(options, (res) => {
	if (res.statusCode >= 200 && res.statusCode < 300) {
		console.log('Request succeeded!');
	} else {
		console.error(`Request failed: ${res.statusCode} ${res.statusMessage}`);
	}
});

req.on('error', (e) => {
	console.error(`Request failed: ${e.message}`);
});

req.write(postData);
req.end();
