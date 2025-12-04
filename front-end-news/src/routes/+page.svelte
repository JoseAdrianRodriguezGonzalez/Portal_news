<script>
    import notaSpider from '$lib/assets/nota.jpg';
    import News1 from '$lib/components/news1.svelte';
    import News2 from '$lib/components/news2.svelte';
    export let data;
    console.log(data);
    let notas=data.noticias;
    console.log("notas",notas)
</script>

<div class="basis-2/3 flex justify-end md:justify-center">
    <img src={notaSpider} alt="News principal SpiderMan" class="h-80 md:h-120"/>
</div>

<div class="w-full border-t-2 border-red-600 mt-2"></div>

<section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-6  p-8
  max-w-7xl 
  mx-auto">

  {#each notas  as article (article._id)}
<News1 title={article.titulo} imagen={notaSpider} link={"/noticia/"+article.slug} />
<!--<News1 title="Spider-Man Faces Off Against Kingpin in Midtown Brawl" imagen={notaSpider} link="#" />
<News1 title="Spider-Man vs. Green Goblin" imagen={notaSpider} link="#" />
<News1 title="Spider-Man Unmasked? " imagen={notaSpider} link="#" />-->
{/each}
</section>

<div class="w-full border-t-2 border-red-600 mt-2"></div>

<section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-6  p-6 
  max-w-7xl mx-auto">
  {#each notas  as article (article._id)}

<News2  section="World news" title={article.titulo} imagen={notaSpider} link={"/noticia/"+article.slug} content={article.resumen}/>
{/each}
<!--<News2  section="World news" title="Spider-Man Saves City from Sinister Six Attack" imagen={notaSpider} link="#" content="Estos títulos reflejan el tipo de noticias fantásticas y dramáticas que podría publicar un periódico dentro del mundo de Spider-Man, mezclando villanos clásicos, eventos extraordinarios y la polémica constante que rodea al héroe en la prensa de su univers"/>
<News2  section="World news" title="Spider-Man Saves City from Sinister Six Attack" imagen={notaSpider} link="#" content="Estos títulos reflejan el tipo de noticias fantásticas y dramáticas que podría publicar un periódico dentro del mundo de Spider-Man, mezclando villanos clásicos, eventos extraordinarios y la polémica constante que rodea al héroe en la prensa de su univers"/>
<News2  section="World news" title="Spider-Man Saves City from Sinister Six Attack" imagen={notaSpider} link="#" content="Estos títulos reflejan el tipo de noticias fantásticas y dramáticas que podría publicar un periódico dentro del mundo de Spider-Man, mezclando villanos clásicos, eventos extraordinarios y la polémica constante que rodea al héroe en la prensa de su univers"/>
-->
</section>