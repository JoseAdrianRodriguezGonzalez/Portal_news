<script>
  export let section;
  export let title;
  export let imagen;
  export let link;
  export let content; // Nuevo prop para el contenido
</script>

<a 
  href={link} 
  class="
    block 
    rounded-lg 
    shadow-lg 
    overflow-hidden 
    transition-transform 
    duration-300 
    hover:scale-105
    hover:shadow-xl
    group
    w-70
    max-w-sm
    relative
  "
>
  <!-- Recuadro rojo con la sección -->
<div class="h-10 oveflow-hidden relative">
  <!-- Badge pequeño en esquina -->
  <div class="
    absolute 
    top-2 
    left-2 
    bg-red-600 
    text-white 
    text-xs 
    font-bold 
    uppercase 
    tracking-tight
    px-2 
    py-1 
    rounded
    shadow-md
    z-10
    whitespace-nowrap
  ">
    {section}
  </div>
</div>
  <div class="p-4">
    <h3 class="
      font-bold 
      text-lg 
      text-gray-800 
      mb-2
      group-hover:text-red-600
      transition-colors
    ">
      {title}
    </h3>
  <div class="h-48 overflow-hidden">
    <img 
      src={imagen} 
      alt={title} 
      class="
        w-full 
        h-full 
        object-cover 
        transition-transform 
        duration-500 
        group-hover:scale-110
      "
    />
  </div>

    
    <p class="
      text-gray-600 
      text-sm 
      leading-relaxed
      line-clamp-5
      mt-3
    ">
      {content}
    </p>
    
    <div class="
      mt-3
      text-red-600 
      text-sm 
      font-semibold
      group-hover:underline
      transition-all
    ">
      Read more →
    </div>
  </div>
</a>