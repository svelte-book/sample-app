<script>
	export let form;
</script>

<h2>ログイン</h2>
{#if form?.success}
	<p>入力されたメールアドレスにログインリンクを送信しました。</p>
{:else}
	<form method="post">
		<p>
			<label for="email">メールアドレス</label>
			<input type="text" name="email" id="email" value={form?.email ?? ''} />
			{#if form?.error === 'missing'}
				<div style:color="red">メールアドレスを入力してください。</div>
			{/if}
			{#if form?.error === 'invalid_format'}
				<div style:color="red">メールアドレスに@がありません。</div>
			{/if}
		</p>
		<p>
			<button type="submit">ログイン</button>
		</p>
	</form>
{/if}
