const mongoose = require('mongoose');

// Definición del Esquema (El plano)
const NoticiaSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        unique: true, 
        required: true
        // Ejemplo: "el-hombre-arana-atrapa-ladron" (para la URL)
    },
    resumen: {
        type: String,
        required: true,
        maxLength: 200 // Texto corto para la tarjeta
    },
    imagen_url: {
        type: String,
        default: 'https://via.placeholder.com/300' // Imagen por defecto
    },
    contenido: {
        type: Object, // Aquí guardamos el JSON complejo del editor
        required: true
    },
    categoria: {
        type: String,
        enum: ['Mundo', 'Política', 'Deportes', 'Tecnología', 'Entretenimiento', 'Spiderman','Ciencia'],
        required: true
    },
    autor_id: {
        type: String, // Guardamos el UUID de Cassandra aquí
        required: true
    },
    autor_nombre: {
        type: String, // Guardamos el nombre para no buscarlo en Cassandra cada vez
        required: true
    },
    vistas: {
        type: Number,
        default: 0
    },
    fecha_publicacion: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('noticia', NoticiaSchema);