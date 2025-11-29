// backend/controllers/usuarioController.js
const usuarioService = require('../services/usuarioService');

class UsuarioController {

    // POST /registro
    async registro(req, res) {
        console.log("📨 Registro:", req.body);
        try {
            const { nombre, email, password, rol } = req.body;
            const usuario = await usuarioService.registrarUsuario({ nombre, email, password, rol });
            res.status(201).json({ success: true, mensaje: "Usuario creado", usuario });
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    }

    // POST /login
    async login(req, res) {
        console.log("📨 Login:", req.body);
        try {
            const { email, password } = req.body;
            const resultado = await usuarioService.autenticarUsuario(email, password);
            if (resultado.success) {
                res.status(200).json(resultado);
            } else {
                res.status(401).json(resultado);
            }
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    //  GET / (Listar todos)
    async listar(req, res) {
        try {
            const usuarios = await usuarioService.listarUsuarios();
            res.status(200).json({ success: true, usuarios });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    //  GET /:id (Obtener uno)
    async obtenerUno(req, res) {
        try {
            const { id } = req.params;
            const usuario = await usuarioService.obtenerUsuario(id);
            res.status(200).json({ success: true, usuario });
        } catch (error) {
            res.status(404).json({ success: false, error: error.message });
        }
    }

    //  PUT /:id (Actualizar)
    async actualizar(req, res) {
        try {
            const { id } = req.params;
            const { nombre, rol } = req.body;
            const resultado = await usuarioService.editarUsuario(id, { nombre, rol });
            res.status(200).json({ success: true, resultado });
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    }

    //  DELETE /:id (Eliminar)
    async eliminar(req, res) {
        try {
            const { id } = req.params;
            const resultado = await usuarioService.borrarUsuario(id);
            res.status(200).json({ success: true, resultado });
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    }
}

module.exports = new UsuarioController();
