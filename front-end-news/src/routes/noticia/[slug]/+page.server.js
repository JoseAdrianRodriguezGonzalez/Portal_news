export async function load({ params, fetch }) {
    const {slug}=params;
    console.log("User ID:", slug);
    //saber si puedo acceder a este recurso
    console.log(slug);
    const res = await fetch(`http://backend:3000/api/noticias/${slug}`, {
        method:"GET",
        headers: { "Content-Type": "application/json" },
    });
    if(!res.ok){
        throw new Error('Failed to fetch user data');
    }

    const noticia=await res.json();
    console.log("si llego",noticia.noticia)
    return {noticia}; 
}