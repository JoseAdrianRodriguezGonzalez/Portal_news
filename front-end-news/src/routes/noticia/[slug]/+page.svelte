<script>
  import Tiptap from '$lib/components/TipTap.svelte';
  export let data;

  let content = data.noticia?.noticia?.contenido ?? { type: 'doc', content: [] };
  let editor;
</script>

<div class="border p-4 rounded bg-white shadow">
  <Tiptap bind:editor content={content} readonly={true} />
</div>
