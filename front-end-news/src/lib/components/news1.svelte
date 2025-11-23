<script>
  export let title;
  export let imagen;
  export let link;
</script>

<a 
  href={link} 
  class="
    block 
    rounded-[10px]
    shadow-lg 
    transition-transform 
    duration-300 
    hover:scale-105
    group
    w-64
    bg-white
    overflow-hidden
  "
>
  <div class="rounded-t-[10px] overflow-hidden h-40">
    <img 
      src={imagen} 
      alt={title} 
      class="
        w-full 
        h-full 
        object-cover 
        transition-transform 
        duration-500 
        group-hover:scale-105
      "
    />
  </div>

  <div class="
    bg-red-600 
    text-white 
    font-bold 
    text-base 
    text-center
    px-3 
    py-3 
    rounded-b-[10px]
    border-2
    h-16  
    flex 
    items-center 
    justify-center
  ">
    <span class="leading-tight">{title}</span>
  </div>
</a>