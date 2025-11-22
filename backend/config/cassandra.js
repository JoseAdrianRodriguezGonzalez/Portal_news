const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: [process.env.CASSANDRA_CONTACT_POINTS || 'cassandra'],
  localDataCenter: 'datacenter1',
  keyspace: 'system'
});

const conectarCassandra = async () => {
  try {
    await client.connect();
    console.log('Conectado al servidor Cassandra');
    return client;
  } catch (error) {
    console.error('Error inicializando Cassandra:', error);
  }
};

const inicializarCassandra = async () => {
  try {
    console.log('Inicializando Cassandra...');
    const queryKeyspace = `
      CREATE KEYSPACE IF NOT EXISTS portal_news
      WITH replication = {
        'class': 'SimpleStrategy', 
        'replication_factor': 1
      }
    `;
    await client.execute(queryKeyspace);
    client.keyspace = 'portal_news';
    console.log('Keyspace configurado');
    const queryUsuarios = `
      CREATE TABLE IF NOT EXISTS usuarios (
        id uuid PRIMARY KEY,
        nombre text,
        email text,
        password text,
        rol text,
        fecha_registro timestamp
      )
    `;
    await client.execute(queryUsuarios);
    console.log('Tabla: Usuarios creada');
    await client.execute(`
      CREATE INDEX IF NOT EXISTS usuarios_email_idx 
      ON usuarios (email)
    `);
    console.log('Índice en email creado');
    const queryBitacora = `
      CREATE TABLE IF NOT EXISTS bitacora (
        id timeuuid,
        usuario_id uuid,
        accion text,
        detalles text,
        fecha timestamp,
        PRIMARY KEY ((usuario_id), fecha)
      ) WITH CLUSTERING ORDER BY (fecha DESC)
    `;
    await client.execute(queryBitacora);
    console.log('Tabla Bitácora creada');
    console.log('Inicialización de Cassandra completada');
  } catch (error) {
    console.error('Error en inicialización de Cassandra:', error);
    throw error;
  }
};
module.exports = { client, conectarCassandra,inicializarCassandra };
