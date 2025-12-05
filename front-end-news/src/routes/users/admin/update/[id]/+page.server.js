export async function load({ params, fetch ,cookies}) {
    const {id}=params;
    console.log("User ID:", id);
    const session = cookies.get("session");
    //saber si puedo acceder a este recurso
    const res = await fetch(`https://portalnews-production.up.railway.app/api/usuarios/${id}`, {
        method:"GET",
        headers:{
            cookie:`session=${session}`
        }
    });
    if(!res.ok){
        throw new Error('Failed to fetch user data');
    }

    const usuario=await res.json();
    return usuario; 
}