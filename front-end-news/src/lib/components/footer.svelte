<script> 
  import dailyBugle from '$lib/assets/logodailypng.svg';
</script>

<footer class="bg-red-600 flex flex-col">
  <div class="flex items-center justify-between items-center px-2 md:px-4 py-3">
    <img src={dailyBugle} alt="Daily Bugle" class="h-7 md:h-16" />

    <nav class="px-4 py-3">
      <ul class="flex flex-row gap-2 text-white font-medium text-[3.25vw] md:gap-8 md:text-lg">
        <li><a href="/contact">Contact us</a></li>
        <li><a href="/about">About us</a></li>
      </ul>
    </nav>
  </div>
</footer>
