<script>
import { page } from '$app/stores';
import dailyBugle from '$lib/assets/welcome.svg';
import logout from '$lib/assets/logout.png';

export let data;
const{ usuarios, UsuarioActual}=data;
console.log(UsuarioActual);
// Determinar qué página estamos mostrando
$: currentPath = $page.url.pathname;
$: isAdmin = UsuarioActual?.rol === 'admin';
$: isJournalist = UsuarioActual?.rol === 'journalist';

// Mostrar tabla solo en páginas específicas
$: showTable = isAdmin || isJournalist;

let toggled = false;

function toggle() {
  toggled = !toggled;
}


</script>

<main class="min-h-screen">
<!-- Header con logo arriba y logour al lado derec  -->
<!-- Header con logo e icono de logout a la derecha -->
<div class="flex justify-end md:justify-center items-center gap-4">
  <img src={dailyBugle} alt="Daily Bugle" class="h-10 md:h-25" />
  <button on:click={toggle} class="flex items-center justify-center">
    <img src={logout} alt="Logout" class="h-6 md:h-14" />
  </button>

</div>

<!-- Barra de título y búsqueda -->
<div class="flex flex-col md:flex-row items-center border-b-2 border-red-600 md:p-2">
    <!-- Columna izquierda vacía -->
    <div class="hidden md:flex basis-1/3"></div>
    
    <!-- Título centrado -->
    <div class="basis-1/3 flex justify-center">
        <h1 class="font-['Merriweather'] text-5xl md:text-4xl font-bold text-gray-800 text-center mb-4 pt-4 md:pt-8">
            {#if isAdmin}
              DashBoard de usuarios
            {:else if isJournalist}
              DashBoard de artículos
            {/if}
            
        </h1>
        
    </div>
    
    <!-- Búsqueda -->
    <div class="flex basis-1/3 justify-center md:justify-end py-2 md:py-3 md:pr-10">
        <div class="relative w-30 md:w-3/4">
            <input
                type="text"
                placeholder="Search"
                class="rounded-full px-8 py-1 border border-red-500 focus:border-pink-500 outline-none transition w-full text-sm"
            />
            <svg class="absolute left-2 top-2 h-4 w-4 text-red-500 pointer-events-none" fill="currentColor" viewBox="0 0 20 20">
                <path d="M12.9 14.32a8 8 0 111.414-1.414l5.384 5.384-1.414 1.414-5.384-5.384zM8 14a6 6 0 100-12 6 6 0 000 12z"/>
            </svg>
        </div>
    </div>
</div>


<div class="container mx-auto p-6">
    <!-- Contador de artículos -->
    <div class="mb-6">
      <div class="inline-flex items-center rounded-lg px-4 py-2 shadow-sm">
        <span class="text-sm font-medium text-gray-700">All</span>
        <span class="ml-2 px-3 py-1 bg-red-200 text-red-600 text-sm font-semibold rounded-full">
          {isAdmin ? usuarios.length : '3'}
        </span>
      </div>
    </div>

    <!-- Tabla -->
    <div class="overflow-x-auto">
      <table class="min-w-full bg-transparent border-2 border-red-600 rounded-lg shadow">
        <thead class="bg-transparent">
          <tr>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700 border border-red-600">{isAdmin ? 'Name' : 'Title'}</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700 border border-red-600">{isAdmin ? 'Register Date' : 'Date'}</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700 border border-red-600">{isAdmin ? 'email' : 'Views'}</th>
            <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700 border border-red-600">{isAdmin ? 'Rol' : 'Status'}</th>
            
        <!--    {#if isAdmin}
              <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700 border border-red-600">Reporter</th>
            {/if}-->
            
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