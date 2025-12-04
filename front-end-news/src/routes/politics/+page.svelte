<script>
    import notaSpider from '$lib/assets/nota.jpg';
    import News1 from '$lib/components/news1.svelte';
    import News2 from '$lib/components/news2.svelte';
    export let data;
    let {noticiasPorCategroia}=data;
    console.log(noticiasPorCategroia)
    let notas=noticiasPorCategroia['Política']
</script>
<h1 class="font-['Merriweather'] text-5xl md:text-5xl font-bold text-gray-800 text-center mb-4 pt-8 md:pt-12">
    News Politics
</h1>

<section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-6  p-6 
  max-w-7xl 
  mx-auto">

  {#each notas  as article (article._id)}
<News1 title={article.titulo} imagen={notaSpider} link={"/noticia/"+article.slug} />
<!--<News1 title="Spider-Man Faces Off Against Kingpin in Midtown Brawl" imagen={notaSpider} link="#" />
<News1 title="Spider-Man vs. Green Goblin" imagen={notaSpider} link="#" />
<News1 title="Spider-Man Unmasked? " imagen={notaSpider} link="#" />-->
{/each}
</section>
