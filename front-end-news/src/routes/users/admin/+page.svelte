<script>
  import {goto,invalidateAll} from "$app/navigation";
  // Datos temporales de prueba (después vendrán de la BD)
export let data;
let usuarios=[...data.usuarios];
const UsuarioActual=data.usuario;


async function deleteArticle(id) {
    console.log(`Eliminar usuario con ID: ${id}`);
    const res=await fetch(`http://localhost:3000/api/usuarios/${id}`,{
      method:"DELETE",
      credentials:"include"
    })
    if(res.ok){
      console.log("si lo hizo la eliminacion ");
      usuarios=usuarios.filter(u=>u.id!=id);
      return ;
    }else{
         const errorData = await res.json().catch(() => ({ error: "No JSON" }));
    console.log("Error al eliminar:", errorData);
    }
  }

</script>

{#each usuarios as usuario (usuario.id)}
  <tr class="hover:bg-gray-50">
    <td class="px-6 py-4 text-sm text-gray-900 border border-red-600">{usuario.nombre}</td>
    <td class="px-6 py-4 text-sm text-gray-600 border border-red-600">{usuario.fecha_registro}</td>
    <td class="px-6 py-4 text-sm text-gray-600 border border-red-600">{usuario.email}</td>
    <td class="px-6 py-4 border border-red-600">
      <span class="px-3 py-1 text-xs rounded-full {usuario.rol === 'admin' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}">
        {usuario.rol}
      </span>
    </td>
  <!--  <td class="px-6 py-4 text-sm text-gray-900 border border-red-600">{usuario.reporter}</td>-->
    <td class="px-6 py-4 grid grid-cols-2 gap-4 border border-red-600">
      <a 
        href={`admin/update/${usuario.id}`} 
        class="inline-block px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 text-center"
      >
        Update
      </a>

      <button 
      type="button"
        on:click={() => deleteArticle(usuario.id)}
        class="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
      >
        Delete
      </button>
    </td>
  </tr>
{/each}