<script> 
    import dailyBugle from '$lib/assets/Daily_Bugle.webp';
</script>

<footer class="bg-red-600 flex flex-col border-y-4 border-red-600">
  <div class="flex flex-row justify-between items-center py-3">
    <img src={dailyBugle} alt="Daily Bugle" class="h-15 md:h-12" />

    <nav class="px-4 py-3">
      <ul class="flex flex-row gap-2 text-white font-medium text-[3.25vw] md:gap-8 md:text-lg">
        <li><a href="/newsletters">Newsletters</a></li>
        <li><a href="/contact">Contact us</a></li>
        <li><a href="/advertise">Advertise</a></li>
        <li><a href="/about">About us</a></li>
      </ul>
    </nav>
  </div>
</footer>
