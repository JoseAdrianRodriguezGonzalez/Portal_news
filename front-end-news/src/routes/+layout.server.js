import { redirect } from "@sveltejs/kit";
import { group } from "console";
export const load = async ({  fetch,cookies,url }) => {
    const actualPath= url.pathname;
    const session = cookies.get("session");
    console.log("COOKIE DESDE SSR:", session);
    const res = await fetch('https://portalnews-production.up.railway.app:3000/api/usuarios/', {
        method:"GET",
        headers:{
            cookie:`session=${session}`
        }
    });
     if (!res.ok) {
        let noticias=[];
        const noticiasRes=await fetch(`https://portalnews-production.up.railway.app:3000/api/noticias/`,{method:"GET"})
        if(noticiasRes.ok){
            noticias=await noticiasRes.json();
        }
        const notas=noticias.noticias
        const noticiasPorCategroia=groupByCategory(notas);
        return { loggedIn: false ,noticias:notas.slice(0,4),noticiasPorCategroia};
    }
    const data=await res.json();
    const rol=data.UsuarioActual?.rol;
    if(rol==="admin"){
        if(!actualPath?.startsWith('/users/admin'))
            throw redirect(302,'/users/admin');
    }
    if(rol==="journalist"){
        if(!actualPath?.startsWith('/users/journalist'))
            throw redirect(302,'/users/journalist');
    }
    if(rol!=="admin" && rol!=="journalist"){
        throw redirect(302,'/');
    }

    return {loggedIn:true};        
    
};

function groupByCategory(noticias){
    const categorias =['Mundo', 'Política', 'Deportes', 'Tecnología', 'Entretenimiento', 'Spiderman','Ciencia'];
    const result = {
       
    };
    const noticiasArray = Array.isArray(noticias) ? noticias : [];
    categorias.forEach(cat => {
        result[cat] = noticiasArray.filter(n => n.categoria === cat).slice(0, 4); // solo 4 noticias
    });
    return result;
}
