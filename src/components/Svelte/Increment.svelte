<script>
	let i = $state([1, 2, 3, 4]);
	let total = $derived(i.reduce((acc, n) => acc + n, 0));
	function push() {
		i.push(i.length + 1);
	}
</script>

<p>{total}</p>
<button onclick={push}>Click</button>
