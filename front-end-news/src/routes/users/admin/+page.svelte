<script>
  // Datos temporales de prueba (después vendrán de la BD)
  let articles = [
    { id: 1, title: "Noticia 1", date: "2024-11-20", views: 150, status: "Published", reporter: "Juan Pérez" },
    { id: 2, title: "Noticia 2", date: "2024-11-21", views: 230, status: "Draft", reporter: "María García" },
    { id: 3, title: "Noticia 3", date: "2024-11-22", views: 320, status: "Published", reporter: "Ana López" }
  ];
  
  /**
   * @param {number} id
   */
  function deleteArticle(id) {
    articles = articles.filter(a => a.id !== id);
  }
</script>

{#each articles as article (article.id)}
  <tr class="hover:bg-gray-50">
    <td class="px-6 py-4 text-sm text-gray-900 border border-red-600">{article.title}</td>
    <td class="px-6 py-4 text-sm text-gray-600 border border-red-600">{article.date}</td>
    <td class="px-6 py-4 text-sm text-gray-600 border border-red-600">{article.views}</td>
    <td class="px-6 py-4 border border-red-600">
      <span class="px-3 py-1 text-xs rounded-full {article.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}">
        {article.status}
      </span>
    </td>
    <td class="px-6 py-4 text-sm text-gray-900 border border-red-600">{article.reporter}</td>
    <td class="px-6 py-4 border border-red-600">
      <button 
        on:click={() => deleteArticle(article.id)}
        class="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
      >
        Delete
      </button>
    </td>
  </tr>
{/each}