const conectarDB = require('../config/db');
const { conectarRedis } = require('../config/redis');
const { conectarCassandra,inicializarCassandra } = require('../config/cassandra');

const initDBs =async ()=>{
 try {
    await conectarDB(); //Conecta mongodb
    await conectarRedis();//Conecta Redis
    await conectarCassandra();//conecta cassandra
    await inicializarCassandra();// Crea la tabla
    console.log("Todas las tablas fueron inicializadas correctamente");
  } catch (error) {
    console.error("Hubo un error al iniciar la base de datos: ",error);
 }
}
module.exports=initDBs;
