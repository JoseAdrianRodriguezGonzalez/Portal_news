const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const auth = require('../middleware/authMiddleware'); // <--- [NUEVO] Importar middleware

//  Rutas Públicas 
router.post('/login',    (req, res) => usuarioController.login(req, res)); //ya esta este bien

//  Rutas Protegidas (Necesitan Token) 
// Ver todos: Cualquier usuario registrado (Reportero o Admin) puede ver la lista
router.get('/', (req,res,next)=>auth.verificarSesion(req,res,next), (req, res) => usuarioController.listar(req, res)); //ya esta correcto

// Ver uno: Cualquier usuario registrado
router.get('/:id', auth.verificarSesion, (req, res) => usuarioController.obtenerUno(req, res)); //Tambien este

//  Rutas de ADMIN (CEO) 
// Editar y Borrar: Solo el Admin pasa
//Modificar esto
router.post('/registro',[auth.verificarSesion, auth.esAdmin], (req, res) => usuarioController.registro(req, res));
router.put('/:id',    [auth.verificarSesion, auth.esAdmin], (req, res) => usuarioController.actualizar(req, res));
router.delete('/:id', [auth.verificarSesion, auth.esAdmin], (req, res) => usuarioController.eliminar(req, res));
router.post("/logout",(req,res)=>usuarioController.logout(req,res));
module.exports = router;