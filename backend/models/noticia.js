const mongoose = require('mongoose');

// Estructura de una noticia
const NoticiaSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true 
    },
    // Necesario o no para la URL amigable SEO 
    slug: {
        type: String,
        unique: true
    },
    // Necesario para la tarjeta del frontend (Home)
    resumen: {
        type: String,
        required: false,
        maxLength: 200 // Un preview corto
    },
    // La imagen que sale en la tarjeta
    imagen_url: {
        type: String, 
        default: 'https://via.placeholder.com/300' // Imagen por defecto si no suben una
    },
    contenido: {
        type: Object, // JSON de TipTap (El artículo completo)
        required: true
    },
    autor_id: {
        type: String, // El ID Cassandra
        required: true
    },
    autor_nombre: {
        type: String,
        required: true
    },
    categoria: { 
        type: String, 
        // Agregué las categorías que se ven en tu imagen de referencia
        enum: ['Mundo', 'Política', 'Deportes', 'Tecnología', 'Entretenimiento', 'Spyderman', 'Ultimas noticias'], 
        required: true
    },
    etiquetas: [String], 
    fecha_publicacion: {
        type: Date,
        default: Date.now 
    }
});

module.exports = mongoose.model('Noticia', NoticiaSchema);