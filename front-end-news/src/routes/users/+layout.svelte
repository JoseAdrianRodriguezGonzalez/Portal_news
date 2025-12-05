<script>
import { onMount } from "svelte";
import { page } from '$app/stores';
import dailyBugle from '$lib/assets/welcome.svg';
import logoutIcon from '$lib/assets/logout.png';
import { goto } from "$app/navigation";
export const ssr=false;
export let data; // datos públicos si los hay

let usuario = null;
let usuarios = [];
let noticias = [];
let currentPath = "";
let showTableLayout = true;

$: isAdmin = usuario?.rol === 'admin';
$: isJournalist = usuario?.rol === 'journalist';

// Determinar qué páginas muestran la tabla
$: showTableLayout = ![`/users/${usuario?.rol}/update`,`/users/${usuario?.rol}/registro`,`/users/${usuario?.rol}/crear`,`/users/${usuario?.rol}/editar`].some(
  path => $page.url.pathname.startsWith(path)
);

console.log("Current Path:", $page.url.pathname, "showTable:", showTableLayout);

onMount(async () => {
  currentPath = window.location.pathname;

  const token = localStorage.getItem("jwt");
  if (!token) {
    // No hay token → público
    if (!currentPath.startsWith("/")) goto("/"); 
    return;
  }

  // Fetch usuario actual
  const res = await fetch("https://portalnews-production.up.railway.app/api/usuarios/", {
    headers: { "Authorization": `Bearer ${token}` }
  });

  if (!res.ok) {
    localStorage.removeItem("jwt");
    goto("/"); 
    return;
  }

  const data = await res.json();
  usuario = data.UsuarioActual;

  // Redirección según rol
  if (usuario.rol === "admin" && !currentPath.startsWith("/users/admin")) {
    goto("/users/admin");
  } else if (usuario.rol === "journalist" && !currentPath.startsWith("/users/journalist")) {
    goto("/users/journalist");
  }

  // Cargar datos según rol
  if (usuario.rol === "admin") {
    usuarios = data.usuarios || [];
  } else if (usuario.rol === "journalist") {
    const noticiasRes = await fetch("https://portalnews-production.up.railway.app/api/noticias", {
      headers: { "Authorization": `Bearer ${token}` }
    });
    const noticiasData = await noticiasRes.json();
    noticias = noticiasData.noticias || [];
  }
});

// Logout
async function toggle() {
  const token = localStorage.getItem("jwt");
  localStorage.removeItem("jwt"); // eliminar token

  // Opcional: avisar al backend para invalidar JWT
  await fetch("https://portalnews-production.up.railway.app/api/usuarios/logout", {
    method: "POST",
    headers: { "Authorization": `Bearer ${token}` }
  });

  goto("/"); // redirigir al home
}
</script>

<main class="min-h-screen">
  <!-- Header -->
  <div class="flex justify-end md:justify-center items-center gap-4">
    <img src={dailyBugle} alt="Daily Bugle" class="h-10 md:h-25" />
    <button on:click={toggle} class="flex items-center justify-center">
      <img src={logoutIcon} alt="Logout" class="h-6 md:h-14" />
    </button>
  </div>

  <!-- Barra de título y búsqueda -->
  <div class="flex flex-col md:flex-row items-center border-b-2 border-red-600 md:p-2">
    <div class="hidden md:flex basis-1/3"></div>
    <div class="basis-1/3 flex justify-center">
      <h1 class="font-['Merriweather'] text-5xl md:text-4xl font-bold text-gray-800 text-center mb-4 pt-4 md:pt-8">
        {#if isAdmin}
          DashBoard de usuarios
        {:else if isJournalist}
          DashBoard de artículos
        {/if}
      </h1>
    </div>
    <div class="flex basis-1/3 justify-center md:justify-end py-2 md:py-3 md:pr-10">
      <div class="relative w-30 md:w-3/4">
        <input type="text" placeholder="Search" class="rounded-full px-8 py-1 border border-red-500 focus:border-pink-500 outline-none transition w-full text-sm"/>
        <svg class="absolute left-2 top-2 h-4 w-4 text-red-500 pointer-events-none" fill="currentColor" viewBox="0 0 20 20">
          <path d="M12.9 14.32a8 8 0 111.414-1.414l5.384 5.384-1.414 1.414-5.384-5.384zM8 14a6 6 0 100-12 6 6 0 000 12z"/>
        </svg>
      </div>
    </div>
  </div>

  {#if showTableLayout}
    <div class="container mx-auto p-6">
      <!-- Contador -->
      <div class="mb-6 flex justify-between">
        <div class="inline-flex items-center rounded-lg px-4 py-2 shadow-sm">
          <span class="text-sm font-medium text-gray-700">All</span>
          <span class="ml-2 px-3 py-1 bg-red-200 text-red-600 text-sm font-semibold rounded-full">
            {isAdmin ? usuarios.length : noticias.length}
          </span>
        </div>
        <div class="inline-flex items-center rounded-lg px-4 py-2 shadow-sm">
          <a href={isAdmin?"admin/registro":"journalist/crear"} data-sveltekit-preload-data="off" class="ml-2 px-3 py-1 bg-green-200 text-green-600 text-sm font-semibold rounded-full">
            {isAdmin ? "Crear usuario" : 'Crear articulo'}
          </a>
        </div>
      </div>

      <!-- Tabla -->
      <div class="overflow-x-auto">
        <table class="min-w-full bg-transparent border-2 border-red-600 rounded-lg shadow">
          <thead class="bg-transparent">
            <tr>
              <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700 border border-red-600">{isAdmin ? 'Name' : 'Title'}</th>
              <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700 border border-red-600">{isAdmin ? 'Register Date' : 'Date'}</th>
              <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700 border border-red-600">{isAdmin ? 'Email' : 'Views'}</th>
              <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700 border border-red-600">{isAdmin ? 'Rol' : 'Categoría'}</th>
              {#if !isAdmin}
                <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700 border border-red-600">Autor</th>
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
  {:else}
    <slot />
  {/if}
</main>
