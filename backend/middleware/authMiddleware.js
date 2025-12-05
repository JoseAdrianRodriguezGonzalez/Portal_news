// backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

class AuthMiddleware {

    static SECRET_KEY = 'secreto_super_seguro_portal_news';

    verificarSesion(req, res, next) {
 
        const token = req.cookies?.session;
        if (!token && req.headers.cookie) {
            const cookies = Object.fromEntries(
                req.headers.cookie.split("; ").map(c => c.split("="))
            );
            token = cookies.session;
        }
        if (!token) {
            return res.status(403).json({ 
                success: false, 
                mensaje: "Token no encontrado" 
            });
        }

        try {
            const decoded = jwt.verify(token, AuthMiddleware.SECRET_KEY);
            req.usuario = decoded;
            console.log("Si se valido el periodista",req.usuario);
            console.log("REQ BODY ENTRANTE:", req.body);
            next();
        } catch (error) {
            return res.status(401).json({ 
                success: false, 
                mensaje: "Token inválido o expirado" 
            });
        }
    }

    esAdmin(req, res, next) {
        if (req.usuario?.rol === "admin") {
            console.log("ES el jEFE. usted si")
            return next();
        }

        return res.status(403).json({
            success: false,
            mensaje: "Acceso denegado: requiere rol ADMIN"
        });
    }
}

module.exports = new AuthMiddleware();
