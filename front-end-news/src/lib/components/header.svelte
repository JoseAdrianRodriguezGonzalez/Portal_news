<script>
  import dailyBugle from '$lib/assets/Daily_Bugle.webp';
  import dayjs from 'dayjs';
  import localizedFormat from 'dayjs/plugin/localizedFormat';
  dayjs.extend(localizedFormat);
  import { onMount, onDestroy } from 'svelte';

  let fechaHora = '';

  function actualizarFecha(){
    fechaHora = dayjs().format('dddd,MMMM D, YYYY HH:mm:ss');
  }
  
  /** @type {ReturnType<typeof setInterval>} */
  let intervalo;
  onMount(() => {
    actualizarFecha();
    intervalo = setInterval(actualizarFecha, 1000);
  });

  onDestroy(() => {
    clearInterval(intervalo);
  });
</script>

<header class="bg-[#f5ede1] flex flex-col border-y-4 border-red-600">
  <div class="flex items-center border-b-2 border-red-600 md:p-2">
    <!-- Izquierda vacía (simula 3 columnas en desktop) -->
    <div class="hidden md:flex basis-1/3"></div>
    <!-- Fecha -->
    <div class="flex basis-1/2 justify-center md:basis-1/3">
      <span class="text-gray-700 whitespace-nowrap text-xs md:text-lg">{fechaHora}</span>
    </div>

    <!-- Búsqueda -->
    <div class="flex basis-1/2 justify-center py-2 md:py-3 md:pr-10 md:basis-1/3">
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
  <!-- Logo + Login -->
  <div class="flex items-center px-2 md:px-4 py-3">
    <!-- Columna izquierda vacía -->
    <div class="hidden md:flex basis-1/3"></div>
    <!-- Logo centrado -->
    <div class="basis-2/3 flex justify-end md:justify-center">
      <img src={dailyBugle} alt="Daily Bugle" class="h-15 md:h-20"/>
    </div>

    <!-- Botón Login -->
    <div class="basis-1/3 flex flex-col items-center">
      <svg class="w-1/4 md:w-1/7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M320 312C386.3 312 440 258.3 440 192C440 125.7 386.3 72 320 72C253.7 72 200 125.7 200 192C200 258.3 253.7 312 320 312zM290.3 368C191.8 368 112 447.8 112 546.3C112 562.7 125.3 576 141.7 576L498.3 576C514.7 576 528 562.7 528 546.3C528 447.8 448.2 368 349.7 368L290.3 368z"/></svg>
    <span class="text-sm md:text-base">login</span>
    </div>

  </div>
  <div class="w-full border-t-2 border-red-600 mt-2"></div>
  <!-- Navegación de secciones en inglés -->
  <nav class=" px-4 mt-1 py-1">
    <ul class="flex flex-row gap-2 text-black font-medium justify-center text-[3.25vw] md:gap-8 md:text-lg">
      <li class="basis-1/6 flex flex-1 justify-center"><a href=/world>World</a></li>
      <li  class="basis-1/6 flex flex-1 justify-center"><a href=/politics>Politics</a></li>
      <li class="basis-1/6 flex flex-1 justify-center"><a href=/technology>Technology</a></li>
      <li class="basis-1/6 flex flex-1 justify-center"><a href=/science>Science</a></li>
      <li class="basis-1/6 flex flex-1 justify-center"><a href=/sports>Sports</a></li>
      <li class="basis-1/6 flex flex-1 justify-center"><a href=/spiderman>Spiderman</a></li>
    </ul>
  </nav>
</header>
