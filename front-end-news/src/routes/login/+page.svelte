<script>
import Box from "../../lib/components/Box.svelte";
import Login from "../../layout/Login.svelte";
import spiderman from "$lib/assets/login/spiderman.png"
</script>
<Box width="bg-[#f2f8ff] grid justify-center items-center">
  <Login></Login>
</Box>
<Box width="bg-[#FFDEDC] place-items-center p-2 hidden md:grid">
  <div class="relative aspect-square w-full max-w-lg">
    <div class="absolute inset-0 flex items-center justify-center " >
      <div class="bg-[#FFB1B1] rounded-full w-6/8 h-6/8 flex items-center justify-center">
        <div  class="bg-[#FF9D9C] rounded-full w-7/8 h-7/8"></div>
      </div>
    </div>
    <img 
      src={spiderman}
      alt="Spiderman"
      class="absolute top-1/2 left-1/2 -translate-y-5/8 -translate-x-5/8 inset-0 w-3/4 h-3/4 object-contain"
    />
  </div>
  
  <!--<img src={spiderman}>-->
</Box>
