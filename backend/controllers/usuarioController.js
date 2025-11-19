const UsuarioService = require('../services/usuarioService');

const crearUsuario = async (req, res) => {
    // [NUEVO] Agrega esta línea para ver los datos en la terminal del docker
    console.log("📨 Petición de registro recibida:", req.body); 

    try {
        const { nombre, email, password, rol } = req.body;
        const usuario = await UsuarioService.registrarUsuario({ nombre, email, password, rol });

        res.status(201).json({
            success: true,
            mensaje: "Usuario creado exitosamente",
            usuario: usuario
        });
    } catch (error) {
        // [NUEVO] Agrega esto también por si el error es diferente
        console.error("❌ Error en el controlador:", error);
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
};

module.exports = { crearUsuario };