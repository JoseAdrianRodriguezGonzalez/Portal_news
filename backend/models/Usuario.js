// Importamos el cliente configurado y la librería para generar IDs
const { client } = require('../config/cassandra');
const { v4: uuidv4 } = require('uuid');
const UsuarioModel = {

    /**
     * Crea un nuevo usuario en Cassandra.
     * @param {string} nombre - Nombre real
     * @param {string} email - Correo (se usará para login)
     * @param {string} password - Contraseña (debería ir hasheada en el futuro)
     * @param {string} rol - 'admin' (CEO) o 'reportero'
     */
    async crearUsuario(nombre, email, password, rol) {
        const rolesPermitidos = ['admin', 'reportero'];
        if (!rolesPermitidos.includes(rol)) {
            throw new Error("Rol inválido. Solo se permite: admin o reportero");
        }

        const id = uuidv4(); // Generamos ID único
        const fecha = new Date();
        
        const query = `
            INSERT INTO usuarios (id, nombre, email, password, rol, fecha_registro)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        
        // Ejecutamos la query inyectando las variables
        try {
            await client.execute(query, [id, nombre, email, password, rol, fecha], { prepare: true });
            return { id, nombre, email, rol, mensaje: "Usuario creado con éxito" };
        } catch (error) {
            console.error("Error en Cassandra Creando Usuario:", error);
            throw error;
        }
    },


    async buscarPorEmail(email) {
        const query = 'SELECT * FROM usuarios WHERE email = ?';
        
        try {
            const result = await client.execute(query, [email], { prepare: true });
            // Cassandra devuelve un arreglo, tomamos el primero
            return result.first(); 
        } catch (error) {
            console.error("Error buscando usuario:", error);
            throw error;
        }
    },


    async buscarPorId(id) {
        const query = 'SELECT * FROM usuarios WHERE id = ?';
        try {
            const result = await client.execute(query, [id], { prepare: true });
            return result.first();
        } catch (error) {
            throw error;
        }
    }
};

module.exports = UsuarioModel;