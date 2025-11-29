const express = require('express');
const router = express.Router();
const usuarioRoutes = require('./usuarioRoutes');

// Definimos la subruta master para los endpoints de usuarios
router.use('/usuarios', usuarioRoutes);

module.exports = router;
