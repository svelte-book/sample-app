<script>
	export let data;
</script>

{#if data.cart.length > 0}
	<ul>
		{#each data.cart as item}
			<li>
				<a href="/products/{item.id}">{item.name}</a>
				- {item.price}円
				<form method="POST" action="?/remove">
					<input type="hidden" name="productId" value={item.id} />
					<button>削除</button>
				</form>
			</li>
		{/each}
	</ul>
{:else}
	<div>カートは空です</div>
{/if}
