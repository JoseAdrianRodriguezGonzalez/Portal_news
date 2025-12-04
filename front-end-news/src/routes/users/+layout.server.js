import { redirect } from "@sveltejs/kit";
export const load = async ({  fetch,cookies,url }) => {
    const actualPath= url.pathname;
    const session = cookies.get("session");
    const res = await fetch('http://backend:3000/api/usuarios/', {
        method:"GET",
        headers:{
            cookie:`session=${session}`
        }
    });
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
    let noticias= [];
    let usuarios=[];
      // Si es admin → backend ya devolvió todos los usuarios
    if (rol === "admin") {
        usuarios = data.usuarios || [];
    }
    if(rol==="journalist"){
        const resNoticias=await fetch('http://backend:3000/api/noticias',{
            method:"GET",
            headers:{
                cookie:`session=${session}`
          }
        });
        const datanoticias=await resNoticias.json();
        noticias=datanoticias.noticias || [];
    }
    return {
        usuario:data.UsuarioActual,
        usuarios,
        noticias
    }
    //if(rol==="journalist") throw redirect(302,'/journalist');
    //if(rol==="admin") throw redirect(302,'/admin');
    //else throw redirect(302,'/');

        
     
};