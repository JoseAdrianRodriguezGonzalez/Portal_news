const mongoose = require('mongoose');

// Estructura de una noticia
const NoticiaSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true //Titulo
    },
    contenido: {
        type: Object, // JSON de TipTap
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
        enum: ['Spyderman', 'Ultimas noticias', 'En vivo', 'Entrevistas'], // No sé que categoria va a meter Isa, entonces por ahora con una lista fija de categorias genericas
        required: true
    },
    etiquetas: [String], // Un arreglo de palabras clave (tags)
    fecha_publicacion: {
        type: Date,
        default: Date.now // Fecha actual por defecto
    }
});

// Exportar el modelo de Noticia
module.exports = mongoose.model('Noticia', NoticiaSchema);