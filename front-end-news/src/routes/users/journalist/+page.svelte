<script>

  // Datos temporales de prueba (después vendrán de la BD)
  let articles = [
    { id: 1, title: "Mi artículo 1", date: "2024-11-22", views: 89, status: "Pending", review: "Pending" },
    { id: 2, title: "Mi artículo 2", date: "2024-11-23", views: 120, status: "Published", review: "Approved" },
    { id: 3, title: "Mi artículo 3", date: "2024-11-24", views: 200, status: "Draft", review: "In Review" }
  ];
  
  /**
   * @param {number} id
   */
  function editArticle(id) {
    console.log('Editando artículo:', id);
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
    <td class="px-6 py-4 border border-red-600">
      <span class="px-3 py-1 text-xs rounded-full {article.review === 'Approved' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}">
        {article.review}
      </span>
    </td>
    <td class="px-6 py-4 border border-red-600">
      <button 
        on:click={() => editArticle(article.id)}
        class="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
      >
        Edit
      </button>
    </td>
  </tr>
{/each}