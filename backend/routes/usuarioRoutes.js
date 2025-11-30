const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const auth = require('../middleware/authMiddleware'); // <--- [NUEVO] Importar middleware

//  Rutas Públicas 
router.post('/registro', (req, res) => usuarioController.registro(req, res));
router.post('/login',    (req, res) => usuarioController.login(req, res));

//  Rutas Protegidas (Necesitan Token) 
// Ver todos: Cualquier usuario registrado (Reportero o Admin) puede ver la lista
router.get('/', auth.verificarSesion, (req, res) => usuarioController.listar(req, res));

// Ver uno: Cualquier usuario registrado
router.get('/:id', auth.verificarSesion, (req, res) => usuarioController.obtenerUno(req, res));

//  Rutas de ADMIN (CEO) 
// Editar y Borrar: Solo el Admin pasa
router.put('/:id',    [auth.verificarSesion, auth.esAdmin], (req, res) => usuarioController.actualizar(req, res));
router.delete('/:id', [auth.verificarSesion, auth.esAdmin], (req, res) => usuarioController.eliminar(req, res));

module.exports = router;