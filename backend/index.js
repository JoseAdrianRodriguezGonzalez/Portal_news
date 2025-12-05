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
  origin: ['https://portal-news-n5yd.vercel.app','https://portal-news-n5yd-b4e1iuqtf-kerpadorgmailcoms-projects.vercel.app/'], // Reemplaza con el origen de tu front-end
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
