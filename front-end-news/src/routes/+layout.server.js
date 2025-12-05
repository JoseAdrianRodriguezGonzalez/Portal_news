import { redirect } from "@sveltejs/kit";
import { browser } from '$app/environment';

export const load = async ({ fetch, url }) => {
    const actualPath = url.pathname;

    let token = null;

    if (browser) {
        // Solo en cliente podemos leer localStorage
        token = localStorage.getItem('token');
    }

    // Requests al backend
    const headers = token ? { 'Authorization': `Bearer ${token}` } : {};

    const res = await fetch('https://portalnews-production.up.railway.app/api/usuarios/', {
        method: "GET",
        headers
    });

    if (!res.ok) {
        // Si no hay token o fallo, traemos noticias públicas
        let noticias = [];
        const noticiasRes = await fetch(`https://portalnews-production.up.railway.app/api/noticias/`, { method: "GET" });
        if (noticiasRes.ok) noticias = await noticiasRes.json();

        const notas = noticias.noticias;
        const noticiasPorCategoria = groupByCategory(notas);

        return { loggedIn: false, noticias: notas.slice(0, 4), noticiasPorCategoria };
    }

    const data = await res.json();
    const rol = data.UsuarioActual?.rol;

    if (rol === "admin" && !actualPath.startsWith('/users/admin')) {
        throw redirect(302, '/users/admin');
    }
    if (rol === "journalist" && !actualPath.startsWith('/users/journalist')) {
        throw redirect(302, '/users/journalist');
    }
    if (rol !== "admin" && rol !== "journalist") {
        throw redirect(302, '/');
    }

    return { loggedIn: true };
};

function groupByCategory(noticias) {
    const categorias = ['Mundo', 'Política', 'Deportes', 'Tecnología', 'Entretenimiento', 'Spiderman', 'Ciencia'];
    const result = {};
    const noticiasArray = Array.isArray(noticias) ? noticias : [];
    categorias.forEach(cat => {
        result[cat] = noticiasArray.filter(n => n.categoria === cat).slice(0, 4);
    });
    return result;
}
