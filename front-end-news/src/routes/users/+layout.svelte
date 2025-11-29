<script>
  import { page } from '$app/stores';
  
  // Determinar qué página estamos mostrando
  $: currentPath = $page.url.pathname;
  $: isAdmin = currentPath.includes('/admin');
  $: isJournalist = currentPath.includes('/journalist');
  
  // Mostrar tabla solo en páginas específicas
  $: showTable = isAdmin || isJournalist;
  

</script>

<main class="min-h-screen">

  <div class="container mx-auto p-6">
    <!-- Contador de artículos -->
    <div class="mb-6">
      <div class="inline-flex items-center rounded-lg px-4 py-2 shadow-sm">
        <span class="text-sm font-medium text-gray-700">All</span>
        <span class="ml-2 px-3 py-1 bg-red-200 text-red-600 text-sm font-semibold rounded-full">
          0
        </span>
      </div>
    </div>

    <!-- Tabla -->
    <div class="overflow-x-auto">
      <table class="min-w-full bg-transparent border-2 border-red-600 rounded-lg shadow">
        <thead class="bg-transparent">
          <tr>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700 border border-red-600">Title</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700 border border-red-600">Date</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700 border border-red-600">Views</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700 border border-red-600">Status</th>
            
            {#if isAdmin}
              <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700 border border-red-600">Reporter</th>
            {/if}
            
            {#if isJournalist}
              <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700 border border-red-600">Review</th>
            {/if}
            
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700 border border-red-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          <slot />
        </tbody>
      </table>
    </div>
  </div>
</main>