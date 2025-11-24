// backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

class AuthMiddleware {
    
    // Llave secreta (En producción esto va en el .env)
    static SECRET_KEY = 'secreto_super_seguro_portal_news';


     *//1. Verifica si el usuario tiene un Token válido (Login activo)

    verificarSesion(req, res, next) {
        const authHeader = req.headers['authorization']; 
        
        if (!authHeader) {
            return res.status(403).json({ success: false, mensaje: "No se proporcionó token de acceso" });
        }

        const token = authHeader.split(' ')[1]; // Quitamos la palabra "Bearer"

        if (!token) {
            return res.status(403).json({ success: false, mensaje: "Formato de token inválido" });
        }

        try {   
            // Verificamos y decodificamos el token
            const decoded = jwt.verify(token, AuthMiddleware.SECRET_KEY);
            
            // Guardamos los datos del usuario en la petición para usarlos después
            req.usuario = decoded; 
            
            next(); // ¡Pase adelante!
        } catch (error) {
            return res.status(401).json({ success: false, mensaje: "Sesión inválida o expirada" });
        }
    }


     //2. Verifica si el usuario es CEO (Admin) (Este se usa DESPUÉS de verificarSesion)

    esAdmin(req, res, next) {
        if (req.usuario && req.usuario.rol === 'admin') {
            next(); // ¡Pase jefe!
        } else {
            return res.status(403).json({ success: false, mensaje: "Acceso denegado: Se requieren permisos de Administrador" });
        }
    }
}


module.exports = new AuthMiddleware();