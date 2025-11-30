<script>
    export let imagen;
    export let name;
    export let github;
    export let rol;
</script>

<div class="flex flex-col items-center text-center p-4 rounded-lg shadow-md">
    <div class="mb-4">
        <img 
            src={imagen} 
            alt={`Foto de ${name}`} 
            class="w-20 h-20 md:w-28 md:h-28 rounded-full object-cover border-2 border-gray-200 mx-auto"
        />
    </div>
    
    <div class="w-full">
        <h2 class="text-lg font-bold text-gray-800 mb-1 line-clamp-2">{name}</h2>
        <p class="text-gray-600 text-sm mb-2 truncate">
            <a href={github} target="_blank" rel="noopener noreferrer" class="hover:underline text-blue-600">
                {github}
            </a>
        </p>
        
        <div class="flex justify-center">
            <span class="bg-red-100 text-red-600 text-sm px-3 py-1 rounded-full">
                {rol}
            </span>
        </div>
    </div>
</div>
