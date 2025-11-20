const mongoose = require('mongoose');

const conectarDB = async () => {
    try {
        //Conectar usando la variable de entorno de Docker
        await mongoose.connect(process.env.MONGO_URI);
        
        console.log('MongoDB Conectado');
    } catch (error) {
        console.error('Error conectando a MongoDB:', error);
        process.exit(1);
    }
};

module.exports = conectarDB;