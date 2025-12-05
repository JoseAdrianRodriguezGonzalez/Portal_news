import { json } from '@sveltejs/kit';

export async function POST({ request }) {
    const body = await request.json();

    // Redirige la petición al backend real
    const res = await fetch('https://portalnews-production.up.railway.app/api/usuarios/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
        credentials: 'include'
    });

    // Pasamos la respuesta tal cual al frontend
    const data = await res.json();

    return json(data, {
        status: res.status
    });
}
