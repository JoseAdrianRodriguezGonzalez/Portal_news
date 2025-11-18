console.log("Hola mundo fsjdfhshsdksjkh"); //Mensaje de Adrian de prueba xd

const express = require('express');
const conectarDB = require('./config/db');
const { conectarCassandra } = require('./config/cassandra');
const { conectarRedis } = require('./config/redis');

const app = express();
const PORT = 3000;

conectarDB();        // Mongo
conectarCassandra(); // Cassandra
conectarRedis();     // Redis

app.get('/', (req, res) => {
  res.send('API del Portal de Noticias Funcionando');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});