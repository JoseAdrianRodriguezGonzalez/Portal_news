<script>
	import { goto } from '$app/navigation';

  export let data;
  // Datos temporales de prueba (después vendrán de la BD)
  let noticias =data.noticias ;
  console.log(noticias)
  /**
   * @param {number} id
   */
  function editArticle(id) {
    console.log('Editando artículo:', id);
    goto("editar")
  }

async function deleteArticle(id) {
    console.log(`Eliminar articulo con ID: ${id}`);
    const res=await fetch(`https://portalnews-production.up.railway.app:3000/api/noticias/${id}`,{
      method:"DELETE",
      credentials:"include"
    })
    if(res.ok){
      console.log("si lo hizo la eliminacion ");
      noticias=noticias.filter(u=>u._id!==id);
      return ;
    }else{
         const errorData = await res.json().catch(() => ({ error: "No JSON" }));
    console.log("Error al eliminar:", errorData);
    }
  }

</script>

{#each noticias as article (article._id)}
  <tr class="hover:bg-gray-50">
    <td class="px-6 py-4 text-sm text-gray-900 border border-red-600">{article.titulo}</td>
    <td class="px-6 py-4 text-sm text-gray-600 border border-red-600">{article.fecha_publicacion}</td>
    <td class="px-6 py-4 text-sm text-gray-600 border border-red-600">{article.vistas}</td>
    <td class="px-6 py-4 border border-red-600">
      <span class="px-3 py-1 text-xs rounded-full {article.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}">
        {article.categoria}
      </span>
    </td>
    <td class="px-6 py-4 border border-red-600">
      <span class="px-3 py-1 text-xs rounded-full {article.review === 'Approved' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}">
        {article.autor_nombre}
      </span>
    </td>
    <td class="px-6 py-4 border border-red-600">
      <a 
      href={`journalist/editar/${article.slug}`} 
      class="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
      >
      Edit
      </a>


            <button 
      type="button"
        on:click={() => deleteArticle(article._id)}
        class="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
      >
        Delete
      </button>
    </td>
  </tr>
{/each}