<script>
  import dailyBugle from '$lib/assets/Daily_Bugle.webp';
</script>

<header class="bg-[#f5ede1] flex flex-col border-y-4 border-red-600">
  <div class="flex items-center border-b-2 border-red-600 md:p-2">
    <!-- Izquierda vacía (simula 3 columnas en desktop) -->
    <div class="hidden md:flex basis-1/3"></div>
    <!-- Fecha -->
    <div class="flex basis-1/2 justify-center md:basis-1/3">
      <span class="text-gray-700 whitespace-nowrap text-xs md:text-base">
        Friday, February 24, 2017
      </span>
    </div>

    <!-- Búsqueda -->
    <div class="flex basis-1/2 justify-end md:justify-end md:pr-10 md:basis-1/3">
      <div class="relative w-40 md:w-56">
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
  <div class="flex items-center px-4 py-3">
    <!-- Columna izquierda vacía -->
    <div class="hidden md:flex basis-1/3"></div>
    <!-- Logo centrado -->
    <div class="basis-1/2 flex justify-end">
      <img src={dailyBugle} alt="Daily Bugle" class="h-10 md:h-20"/>
    </div>

    <!-- Botón Login -->
    <div class="basis-1/2 flex justify-center md:justify-end">
      <button class="bg-red-600 hover:bg-pink-500 text-white font-bold rounded-full transition text-sm md:text-lg px-6 py-2 md:px-10 md:py-3">
        Login
      </button>
    </div>

  </div>
  <div class="w-full border-t-2 border-red-600 mt-2"></div>
  <!-- Navegación de secciones en inglés -->
  <nav class="max-w-7xl mx-auto px-4 mt-1">
    <ul class="flex gap-8 text-black font-medium text-lg justify-center">
      <li><a href="#">World</a></li>
      <li><a href="#">Politics</a></li>
      <li><a href="#">Technology</a></li>
      <li><a href="#">Science</a></li>
      <li><a href="#">Sports</a></li>
      <li><a href="#">Spiderman</a></li>
    </ul>
  </nav>
</header>
