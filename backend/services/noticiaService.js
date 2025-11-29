// backend/services/noticiaService.js
const NoticiaModel = require('../models/noticia');

class NoticiaService {

    // Crear Noticia (Permitido para Reporteros y Admins)
    async crearNoticia(datos) {
        // Aquí se podríia agregar validaciones extra de texto, prohibir groserías, etc.
        
        // Generamos el slug automáticamente si no viene (simple)
        if (!datos.slug) {
            datos.slug = datos.titulo.toLowerCase().replace(/ /g, '-') + '-' + Date.now();
        }

        const nuevaNoticia = new NoticiaModel(datos);
        return await nuevaNoticia.save();
    }

    // Leer Todas (Feed del Home - Público)
    async obtenerTodas() {
        // Traemos todas, ordenadas por fecha (más nueva primero)
        // .lean() hace que la consulta sea más rápida devolviendo objetos JSON simples
        return await NoticiaModel.find().sort({ fecha_publicacion: -1 }).lean();
    }

    // Leer Una por Slug (Vista de Detalle - Público)
    async obtenerPorSlug(slug) {
        const noticia = await NoticiaModel.findOne({ slug });
        if (!noticia) throw new Error("Noticia no encontrada");
        
        // Incrementamos el contador de vistas
        noticia.vistas += 1;
        await noticia.save();
        
        return noticia;
    }

    // Editar (Solo Admin)
    async editarNoticia(id, datosNuevos) {
        const noticia = await NoticiaModel.findByIdAndUpdate(id, datosNuevos, { new: true });
        if (!noticia) throw new Error("No se pudo editar: Noticia no existe");
        return noticia;
    }

    // Borrar (Solo Admin)
    async borrarNoticia(id) {
        const noticia = await NoticiaModel.findByIdAndDelete(id);
        if (!noticia) throw new Error("No se pudo eliminar: Noticia no existe");
        return { mensaje: "Noticia eliminada correctamente", id };
    }
}

module.exports = new NoticiaService();