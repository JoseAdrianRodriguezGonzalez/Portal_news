const UsuarioModel = require('../models/Usuario');
// const bcrypt = require('bcrypt'); // (Pendiente instalar para encriptar pass)

const UsuarioService = {
    async registrarUsuario(datos) {
        // 1. Aquí podrías validar si el email ya existe (llamando a buscarPorEmail)
        // 2. Aquí encriptaríamos la contraseña: const passHash = await bcrypt.hash(datos.password, 10);
        
        // 3. Llamamos al modelo para guardar (usamos el modelo que ya hiciste)
        // Nota: Por ahora pasamos la password en texto plano hasta que instales bcrypt
        const nuevoUsuario = await UsuarioModel.crearUsuario(
            datos.nombre, 
            datos.email, 
            datos.password, // Aquí iría passHash 
            datos.rol
        );
        
        return nuevoUsuario;
    }
};

module.exports = UsuarioService;