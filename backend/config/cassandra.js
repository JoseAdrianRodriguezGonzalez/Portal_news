const cassandra = require('cassandra-driver');
const path = require('path');

// Ruta al bundle
const bundlePath = path.join(__dirname, 'config/secure-connect.zip');

const client = new cassandra.Client({
  cloud: { secureConnectBundle: bundlePath },
  keyspace: 'portal_news' // tu keyspace
});

const conectarCassandra = async () => {
  try {
    await client.connect();
    console.log('Conectado a Astra DB');
    return client;
  } catch (error) {
    console.error('Error inicializando Cassandra:', error);
  }
};

const inicializarCassandra = async () => {
  try {
    console.log('Inicializando Cassandra...');
    
    // Tabla usuarios
    await client.execute(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id uuid PRIMARY KEY,
        nombre text,
        email text,
        password text,
        rol text,
        fecha_registro timestamp
      )
    `);
    console.log('Tabla: Usuarios creada');

    await client.execute(`
      CREATE INDEX IF NOT EXISTS usuarios_email_idx 
      ON usuarios (email)
    `);
    console.log('Índice en email creado');

    // Tabla bitacora
    await client.execute(`
      CREATE TABLE IF NOT EXISTS bitacora (
        id timeuuid,
        usuario_id uuid,
        accion text,
        detalles text,
        fecha timestamp,
        PRIMARY KEY ((usuario_id), fecha)
      ) WITH CLUSTERING ORDER BY (fecha DESC)
    `);
    console.log('Tabla Bitácora creada');

    console.log('Inicialización de Cassandra completada');
  } catch (error) {
    console.error('Error en inicialización de Cassandra:', error);
    throw error;
  }
};

module.exports = { client, conectarCassandra, inicializarCassandra };
