const express = require('express');
const router = express.Router();

// Importamos las rutas específicas
const usuarioRoutes = require('./usuarioRoutes');
const noticiaRoutes = require('./noticiaRoutes'); 

// Definimos las subrutas maestras
router.use('/usuarios', usuarioRoutes);
router.use('/noticias', noticiaRoutes); 

module.exports = router;
