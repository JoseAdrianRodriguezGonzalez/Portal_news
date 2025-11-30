// backend/services/usuarioService.js
const UsuarioModel = require('../models/Usuario');
const jwt = require('jsonwebtoken'); // <--- [NUEVO] Importar

class UsuarioService {
    
    // Registrar
    async registrarUsuario(datos) {
        const usuarioExistente = await UsuarioModel.buscarPorEmail(datos.email);
        if (usuarioExistente) {
            throw new Error("El correo ya está registrado");
        }
        return await UsuarioModel.crear(
            datos.nombre, 
            datos.email, 
            datos.password, 
            datos.rol
        );
    }

    // Login 
    async autenticarUsuario(email, password) {
        const usuario = await UsuarioModel.buscarPorEmail(email);
        if (!usuario) return { success: false, mensaje: "Usuario no encontrado" };

        if (usuario.password === password) {
            const { password, ...datosPublicos } = usuario;
            
            // [NUEVO] Generamos el Token JWT
            // Incluimos ID y ROL dentro del token encriptado
            const token = jwt.sign(
                { id: usuario.id, rol: usuario.rol, email: usuario.email },
                'secreto_super_seguro_portal_news', // Misma clave que en el middleware
                { expiresIn: '2h' } // Expira en 2 horas
            );

            // Devolvemos usuario Y token
            return { success: true, token, usuario: datosPublicos }; 
        } else {
            return { success: false, mensaje: "Contraseña incorrecta" };
        }
    }

    //  Obtener lista completa
    async listarUsuarios() {
        return await UsuarioModel.obtenerTodos();
    }

    //  Obtener un usuario específico
    async obtenerUsuario(id) {
        const usuario = await UsuarioModel.buscarPorId(id);
        if (!usuario) throw new Error("Usuario no encontrado");
        
        const { password, ...datosPublicos } = usuario; // Ocultamos password
        return datosPublicos;
    }

    //  Actualizar usuario
    async editarUsuario(id, datos) {
        // Validamos si existe antes de editar
        const existe = await UsuarioModel.buscarPorId(id);
        if (!existe) throw new Error("No se puede editar: Usuario no existe");

        return await UsuarioModel.actualizar(id, datos.nombre, datos.rol);
    }

    //  Eliminar usuario
    async borrarUsuario(id) {
        const existe = await UsuarioModel.buscarPorId(id);
        if (!existe) throw new Error("No se puede eliminar: Usuario no existe");

        return await UsuarioModel.eliminar(id);
    }
}

module.exports = new UsuarioService();