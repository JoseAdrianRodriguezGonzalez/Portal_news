// backend/models/Usuario.js
const { client } = require('../config/cassandra');
const { v4: uuidv4 } = require('uuid');

class UsuarioModel {

    // CREATE 
    static async crear(nombre, email, password, rol) {
        const rolesPermitidos = ['admin', 'reportero'];
        if (!rolesPermitidos.includes(rol)) throw new Error("Rol inválido");

        const id = uuidv4();
        const fecha = new Date();
        
        const query = `
            INSERT INTO usuarios (id, nombre, email, password, rol, fecha_registro)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        
        await client.execute(query, [id, nombre, email, password, rol, fecha], { prepare: true });
        return { id, nombre, email, rol };
    }

    // READ 
    static async buscarPorEmail(email) {
        const query = 'SELECT * FROM usuarios WHERE email = ?';
        const result = await client.execute(query, [email], { prepare: true });
        return result.first();
    }

    // READ (Obtener Uno por ID) 
    static async buscarPorId(id) {
        const query = 'SELECT * FROM usuarios WHERE id = ?';
        const result = await client.execute(query, [id], { prepare: true });
        return result.first();
    }

    // READ (Listar Todos)
    static async obtenerTodos() {
        const query = 'SELECT id, nombre, email, rol, fecha_registro FROM usuarios';
        const result = await client.execute(query, [], { prepare: true });
        return result.rows;
    }

    // UPDATE 
    static async actualizar(id, nombre, rol) {
        const query = `
            UPDATE usuarios 
            SET nombre = ?, rol = ? 
            WHERE id = ?
        `;
        await client.execute(query, [nombre, rol, id], { prepare: true });
        return { id, nombre, rol, mensaje: "Usuario actualizado" };
    }

    // DELETE 
    static async eliminar(id) {
        const query = 'DELETE FROM usuarios WHERE id = ?';
        await client.execute(query, [id], { prepare: true });
        return { mensaje: "Usuario eliminado", id };
    }
}

module.exports = UsuarioModel;