import { redirect } from "@sveltejs/kit";

// Este load solo verifica si hay token, redirige según rol
export const load = async ({ url, fetch }) => {
    const actualPath = url.pathname;

    // Esto se ejecuta en SSR: no hay localStorage, solo podemos intentar leer cookie (opcional)
    // Pero con JWT en localStorage, lo manejaremos en el cliente
    return {
        loggedIn: false, // inicial
        actualPath
    };
};
