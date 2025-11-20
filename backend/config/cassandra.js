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

    //Crear Keyspace
    const queryKeyspace = `
      CREATE KEYSPACE IF NOT EXISTS portal_news
      WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '1' }
    `;
    await client.execute(queryKeyspace);
    
    //Keyspace correcto
    client.keyspace = 'portal_news'; 
    console.log('Keyspace configurado');

    //Crear Tabla de USUARIOS
    const queryUsuarios = `
      CREATE TABLE IF NOT EXISTS usuarios (
        id uuid PRIMARY KEY,
        nombre text,
        email text,
        password text,
        rol text,
        fecha_registro timestamp
      );
    `; 
    await client.execute(queryUsuarios);     //UUID para ID único.

    //email debe ser único, para búsquedas rápidas
    await client.execute('CREATE INDEX IF NOT EXISTS ON usuarios (email)'); //Índice en email
    console.log('Tabla: Usuarios');

    //Crear Tabla de BITÁCORA (Logs)
    //La CLAVE PRIMARIA es especial: ((usuario_id), fecha) : Esto significa: "Agrupa por usuario, y ordena por fecha"
    const queryLogs = `
      CREATE TABLE IF NOT EXISTS bitacora (
        id timeuuid,
        usuario_id uuid,
        accion text,
        detalles text,
        fecha timestamp,
        PRIMARY KEY ((usuario_id), fecha)
      ) WITH CLUSTERING ORDER BY (fecha DESC);
    `;
    await client.execute(queryLogs);
    console.log('Tabla Bitácora lista');
    
    return client;
  } catch (error) {
    console.error('Error inicializando Cassandra:', error);
  }
};

module.exports = { client, conectarCassandra };