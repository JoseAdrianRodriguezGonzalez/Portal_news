<script context="module">
    // Evita que este componente corra en el servidor
    export const ssr = false;
</script>

<script>
    import { onMount, onDestroy } from 'svelte';
    import { Editor } from '@tiptap/core';
    import StarterKit from '@tiptap/starter-kit';
    import Placeholder from '@tiptap/extension-placeholder';

    export let content = null;
    export let editor = null;
    export let onUpdate = () => {};
    export let readonly=false;
    let editorElement;

    const EMPTY_DOC = { type: "doc", content: [] };

    onMount(() => {
        editor = new Editor({
            element: editorElement,
            content: content ?? EMPTY_DOC,
            editable:!readonly,
            extensions: [
                StarterKit,
                Placeholder.configure({
                    placeholder: 'Escribe aquí...',
                })
            ],
            onUpdate: ({ editor }) => {
                onUpdate({
                    html: editor.getHTML(),
                    json: editor.getJSON(),
                });
            }
        });
    });

    onDestroy(() => {
        // Ahora sí: destroy siempre es válido porque no hay SSR
        editor?.destroy();
    });

    // Si cambia el contenido (modo edición), actualizar el editor
    $: if (editor && content) {
        editor.commands.setContent(content);
    }
</script>

<div bind:this={editorElement} class="prose max-w-none"></div>


<style>
    /* Puedes agregar cualquier estilo base */
    .prose :global(p) {
        margin: 0.5rem 0;
    }

    .prose :global(.is-editor-empty::before) {
        content: attr(data-placeholder);
        color: #aaa;
        pointer-events: none;
    }
</style>