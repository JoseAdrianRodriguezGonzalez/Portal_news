<script>
  import dailyBugle from '$lib/assets/Daily_Bugle.webp';
</script>

<header class="bg-[#f5ede1] border-b-2 border-red-600">
  <!-- Línea roja superior -->
  <div class="w-full border-t-2 border-red-600"></div>
  
  <!-- Contenedor fecha y busqueda-->
  <div class="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 relative">
    <!-- Fecha centrada -->
    <div class="w-full flex justify-center">
      <span class="text-xs text-gray-700 whitespace-nowrap">Friday, February 24, 2017</span>
    </div>
    <!-- Barra de búsqueda -->
    <div class="absolute right-4 top-1 flex items-center">
      <div class="relative w-56">
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


  <!-- Línea roja debajo de la fecha/búsqueda -->
  <div class="w-full border-t border-red-600 mb-2"></div>

  <!-- Logo y login -->
  <div class="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 relative">
    <!-- Logo Daily Bugle (centro) -->
    <div class="w-full flex justify-center">
      <img src={dailyBugle} alt="Daily Bugle" class="h-20"/>
    </div>
    <!-- Botón ingresar (derecha) -->
    <div class="flex-1 flex justify-end">
      <button class="bg-red-600 hover:bg-pink-500 text-white font-bold rounded-full px-10 py-3 transition text-lg">
        Login
      </button>
    </div>
  </div>

  <!-- Línea roja debajo del logo/login -->
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
