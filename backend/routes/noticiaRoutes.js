// backend/routes/noticiaRoutes.js
const express = require('express');
const router = express.Router();
const noticiaController = require('../controllers/noticiaController');
const auth = require('../middleware/authMiddleware');

//  Rutas Públicas (Cualquiera puede leer) 
router.get('/', (req, res) => noticiaController.verFeed(req, res));
router.get('/:slug', (req, res) => noticiaController.leerNota(req, res));

//  Rutas Protegidas (Reporteros y Admins) 
// Cualquiera con sesión válida puede CREAR
router.post('/', auth.verificarSesion, (req, res) => noticiaController.publicar(req, res));

//  Rutas Exclusivas de ADMIN 
// Solo el CEO puede editar o borrar noticias de la base de datos
router.put('/:id',    [auth.verificarSesion, auth.esAdmin], (req, res) => noticiaController.editar(req, res));
router.delete('/:id', [auth.verificarSesion, auth.esAdmin], (req, res) => noticiaController.eliminar(req, res));

module.exports = router;