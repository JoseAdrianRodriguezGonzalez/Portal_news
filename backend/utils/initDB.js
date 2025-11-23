const conectarDB = require('../config/db');
const { conectarRedis } = require('../config/redis');
const { conectarCassandra,inicializarCassandra } = require('../config/cassandra');

const initDBs =async ()=>{
  try {
    await conectarDB();
    console.log("MongoDB");
  } catch (err) {
    console.error("MongoDB Error:", err.message);
  }

  // Redis
  try {
    await conectarRedis();
    console.log("Redis");
  } catch (err) {
    console.error("Redis Error:", err.message);
  }

  // Cassandra
  try {
    await conectarCassandra();
    await inicializarCassandra();
    console.log("Cassandra ");
  } catch (err) {
    console.error("Cassandra Error:", err.message);
  }
}
module.exports=initDBs;
