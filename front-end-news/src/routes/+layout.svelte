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
  <div class="min-h-screen flex flex-col">
    <Header />
    <main class="grow">
      <slot />
    </main>
    <Footer />
  </div>
{:else }
  <slot />
{/if}