const express = require('express'); //framework de express
const cors = require('cors');//Manejo de cors
const app = express();
//Rutas
const cookieParser = require('cookie-parser');//Manejo de cookies
const usuarioRoutes = require('./routes/index'); 
const PORT = 3000;//Definición de puerto de conexión
const initDB=require('./utils/initDB.js');//Función de inicialización de base de datos 
//Middlewares globales
app.use(cors({
  origin: 'http://localhost:5173', // Reemplaza con el origen de tu front-end
  credentials: true // Habilita el envío de cookies
}))
app.use(express.json());
app.use(cookieParser());
app.use('/api', usuarioRoutes); //Enrutador principal  
(async()=>{
  await initDB();
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
  });
})(); 
