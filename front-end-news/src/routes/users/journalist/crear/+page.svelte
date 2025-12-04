<script>
	import {goto} from '$app/navigation';
    import Tiptap from '../../../../lib/components/TipTap.svelte';

    let json = null;
    let editor = '';
    let categoria=''
    function addLink() {
        const url = prompt("Ingresa el URL:");
        if (url) {
            editor.chain().focus().setLink({ href: url }).run();
        }
    }
    $: console.log("JSON:", json);
$: console.log("H1 extraído:", extraerTitulo(json));
    function extraerTitulo(json){
        if(!json?.content) return "";
        for (const bloque of json.content){
            if(bloque.type ==="heading" && bloque.attrs?.level===1){
                return (bloque.content?.[0]?.text || "").trim();
            }
        }
        return "";
    }
    function extraerResumen(json,maxLength=200){
        if(!json?.content) return "";
        const primerParrafo = json.content.find(
        bloque => bloque.type === "paragraph" && bloque.content
        );

        if (!primerParrafo) return "";
        let resumen = primerParrafo.content.map(n => n.text || "").join(" ").trim();
        console.log(resumen);
        console.log(resumen.length)
        if (resumen.length > maxLength) {
            resumen = resumen.slice(0, maxLength-3).trim();
            resumen += "...";
        }

        return resumen;
    }
    async function saveNews(){
        const contenido =editor?.getJSON() || json;
        console.log("Contenido a guardar:", contenido);
        const titulo =extraerTitulo(contenido);
        const resumen =extraerResumen(contenido);
        if(!titulo){
            console.log("Debe de agregar un titulo");
        }
        const body ={
            titulo,
            contenido,
            categoria,
            resumen 
        }
        const res=await fetch("http://localhost:3000/api/noticias/",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            credentials:"include",
            body:JSON.stringify(body)
        });
        const data=await res.text();
        console.log(data);
        if(res.ok){
            goto("/");
        }

    }
</script>
 <div class="p-3 border-b flex items-center gap-2 bg-gray-100">
        <label class="text-sm font-semibold">Género:</label>
        <input
            type="text"
            bind:value={categoria}
            placeholder="Ej. política, deportes, tecnología..."
            class="border rounded px-2 py-1 w-48"
        />

        <button
            on:click={saveNews}
            class="ml-auto px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded"
        >
            Guardar noticia
        </button>
    </div>
<div class="border rounded-md shadow bg-white">
    <!-- Toolbar -->
    <div class="flex items-center gap-2 p-2 border-b bg-gray-50 text-sm">

        <button 
            class="px-2 py-1 rounded border bg-white border-gray-300 hover:bg-gray-200"
            on:click={() => editor?.chain().focus().toggleBold().run()}>
            Negrita
        </button>

        <button 
            class="px-2 py-1 rounded border bg-white border-gray-300 hover:bg-gray-200"
            on:click={() => editor?.chain().focus().toggleItalic().run()}>
            Cursiva
        </button>

        <button 
            class="px-2 py-1 rounded border bg-white border-gray-300 hover:bg-gray-200"
            on:click={() => editor?.chain().focus().toggleUnderline().run()}>
            Subrayado
        </button>

        <div class="w-px h-5 bg-gray-300 mx-1"></div>

        <button 
            class="px-2 py-1 rounded border bg-white border-gray-300 hover:bg-gray-200"
            on:click={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}>
            H1
        </button>

        <button 
            class="px-2 py-1 rounded border bg-white border-gray-300 hover:bg-gray-200"
            on:click={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}>
            H2
        </button>

        <div class="w-px h-5 bg-gray-300 mx-1"></div>

        <button 
            class="px-2 py-1 rounded border bg-white border-gray-300 hover:bg-gray-200"
            on:click={() => editor?.chain().focus().toggleBulletList().run()}>
            Lista
        </button>

        <button 
            class="px-2 py-1 rounded border bg-white border-gray-300 hover:bg-gray-200"
            on:click={() => editor?.chain().focus().toggleOrderedList().run()}>
            Ordenada
        </button>

        <div class="w-px h-5 bg-gray-300 mx-1"></div>

        <button 
            class="px-2 py-1 rounded border bg-white border-gray-300 hover:bg-gray-200"
            on:click={() => editor?.chain().focus().toggleCodeBlock().run()}>
            Código
        </button>

        <button 
            class="px-2 py-1 rounded border bg-white border-gray-300 hover:bg-gray-200"
            on:click={() => editor?.chain().focus().toggleBlockquote().run()}>
            Cita
        </button>

        <div class="w-px h-5 bg-gray-300 mx-1"></div>

        <button 
            class="px-2 py-1 rounded border bg-white border-gray-300 hover:bg-gray-200"
            on:click={addLink}>
            Link
        </button>

    </div>

   <Tiptap 
    bind:editor
    onUpdate={() => { json = editor?.getJSON(); }}
/>

</div>
