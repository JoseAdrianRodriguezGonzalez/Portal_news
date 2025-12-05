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
  origin: 'https://portal-news-n5yd-q4bwryqh1-kerpadorgmailcoms-projects.vercel.app', // frontend exacto
  credentials: true,
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
}));
// Para que OPTIONS nunca falle

app.use(express.json());
app.use(cookieParser());
app.use('/api', usuarioRoutes); //Enrutador principal  
(async()=>{
  await initDB();
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
  });
})(); 
