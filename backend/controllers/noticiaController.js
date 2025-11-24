// backend/controllers/noticiaController.js
const noticiaService = require('../services/noticiaService');

class NoticiaController {

    // POST / (Crear)
    async publicar(req, res) {
        console.log("📨 Publicando noticia:", req.body.titulo);
        try {
            // Agregamos automáticamente el ID y Nombre del autor basado en el Token
            // (Esto viene del middleware auth.verificarSesion)
            const datosNoticia = {
                ...req.body,
                autor_id: req.usuario.id,
                autor_nombre: req.usuario.nombre || req.usuario.email // Fallback si no tiene nombre
            };

            const noticia = await noticiaService.crearNoticia(datosNoticia);
            res.status(201).json({ success: true, mensaje: "Noticia publicada", noticia });
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    }

    // GET / (Feed)
    async verFeed(req, res) {
        try {
            const noticias = await noticiaService.obtenerTodas();
            res.status(200).json({ success: true, noticias });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    // GET /:slug (Leer nota individual)
    async leerNota(req, res) {
        try {
            const { slug } = req.params;
            const noticia = await noticiaService.obtenerPorSlug(slug);
            res.status(200).json({ success: true, noticia });
        } catch (error) {
            res.status(404).json({ success: false, error: error.message });
        }
    }

    // PUT /:id (Editar)
    async editar(req, res) {
        try {
            const { id } = req.params;
            const noticia = await noticiaService.editarNoticia(id, req.body);
            res.status(200).json({ success: true, mensaje: "Noticia actualizada", noticia });
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    }

    // DELETE /:id (Borrar)
    async eliminar(req, res) {
        try {
            const { id } = req.params;
            const resultado = await noticiaService.borrarNoticia(id);
            res.status(200).json({ success: true, resultado });
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    }
}

module.exports = new NoticiaController();