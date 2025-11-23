const express = require('express'); //framework de express
const app = express();
//Rutas
const usuarioRoutes = require('./routes/index'); 
const PORT = 3000;//Definición de puerto de conexión
const initDB=require('./utils/initDB.js');//Función de inicialización de base de datos 
//Middlewares globales
app.use(express.json());
app.use('/api', usuarioRoutes); //Enrutador principal  
(async()=>{
  await initDB();
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
  });
})(); 
