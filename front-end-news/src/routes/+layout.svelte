<script>
	import '../app.css';
	import favicon from '$lib/assets/logo.png';
	import Header from '$lib/components/header.svelte';
	import Footer from '$lib/components/footer.svelte';


</script>


<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>


<Header> 
	<slot />
</Header>
<Footer />


<!--  {@render children()} -->
