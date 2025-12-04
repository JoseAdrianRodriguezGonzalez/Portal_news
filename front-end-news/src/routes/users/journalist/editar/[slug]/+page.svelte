<script context="module">
    export const ssr = false;
</script>

<script>
	import { goto } from '$app/navigation';
	import Tiptap from '$lib/components/TipTap.svelte';

	export let data;

	// JSON original desde el servidor
	let json = data.noticia?.noticia?.contenido ?? { type: 'doc', content: [] };
    let id =data.noticia.noticia._id
	let editor = null;
	let categoria = data.noticia?.noticia?.categoria ?? "";
            
            console.log(id);	// === utilidades ===
	function extraerTitulo(doc) {
		if (!doc?.content) return "";
		for (const b of doc.content) {
			if (b.type === "heading" && b.attrs?.level === 1) {
				return b.content?.[0]?.text?.trim() ?? "";
			}
		}
		return "";
	}

	function extraerResumen(doc) {
		if (!doc?.content) return "";
		for (const b of doc.content) {
			if (b.type === "paragraph" && b.content) {
				return b.content.map(n => n.text || "").join(" ").trim();
			}
		}
		return "";
	}

	function addLink() {
		const url = prompt("Ingresa el URL:");
		if (url) {
			editor?.chain().focus().setLink({ href: url }).run();
		}
	}

	async function saveNews() {
		const contenido = editor?.getJSON() ?? json;

		const titulo = extraerTitulo(contenido);
		const resumen = extraerResumen(contenido);

		if (!titulo) {
			alert("Debe agregar un título (H1)");
			return;
		}

		const body = {
			titulo,
			contenido,
			categoria,
			resumen
		};

		const res = await fetch(`http://localhost:3000/api/noticias/${id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
			body: JSON.stringify(body)
		});

		if (res.ok) {
			goto("/");
		} else {
			console.log(await res.text());
		}
	}
</script>

<!-- === Barra superior === -->
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


	<!-- TIPTAP -->
	<Tiptap 
		bind:editor
		content={json}
		onUpdate={() => { json = editor?.getJSON(); }}
	/>
</div>

