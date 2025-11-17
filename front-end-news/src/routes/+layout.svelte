<script>
	import '../app.css';
	import favicon from '$lib/assets/logo.png';
	import Header from '$lib/components/header.svelte';
	import Footer from '$lib/components/footer.svelte';
  import {page} from "$app/stores";

  $:showLayout=!$page.url.pathname.startsWith("/login");

</script>


<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>
{#if showLayout}
  <Header />
  <main>
    <slot />
  </main>
  <Footer />
{:else }
  <slot />
{/if}

<!--  {@render children()} -->
