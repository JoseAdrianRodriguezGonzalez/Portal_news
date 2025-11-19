const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Definimos la ruta: POST /api/usuarios/registro
router.post('/registro', usuarioController.crearUsuario);

module.exports = router;