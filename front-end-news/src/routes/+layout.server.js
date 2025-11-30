import { redirect } from "@sveltejs/kit";
export const load = async ({  fetch,cookies,url }) => {
    const actualPath= url.pathname;
    console.log("PATH ACTUAL:", actualPath);
    const session = cookies.get("session");
    console.log("COOKIE DESDE SSR:", session);
    if (!session) {
        throw redirect(302, '/');
    }
    const res = await fetch('http://backend:3000/api/usuarios/', {
        method:"GET",
        headers:{
            cookie:`session=${session}`
        }
    });
     if (!res.ok) {
        // sesión inválida / expirada / token corrupto
        throw redirect(302, '/');
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
    //if(rol==="journalist") throw redirect(302,'/journalist');
    //if(rol==="admin") throw redirect(302,'/admin');
    //else throw redirect(302,'/');

        
     
};
