// cassandra.js
const { Client } = require('cassandra-driver');
const path = require('path');
const fs = require('fs');

// Ajusta la ruta según dónde esté tu ZIP en el proyecto
const bundlePath = path.join(__dirname, 'secure-connect-datacenter1.zip');

// Verificar si el bundle existe
if (!fs.existsSync(bundlePath)) {
  console.error('❌ ERROR: secure-connect bundle no encontrado en:', bundlePath);
  console.error('Asegúrate de commitearlo y que no esté en .gitignore');
  process.exit(1);
} else {
  console.log('✅ Bundle encontrado en:', bundlePath);
}

// Crear cliente Cassandra usando bundle de Astra
const client = new Client({
  cloud: { secureConnectBundle: bundlePath },
  keyspace: 'portal_news' // tu keyspace
});

// Función para conectar
const conectarCassandra = async () => {
  try {
    await client.connect();
    console.log('✅ Conectado a Astra DB Cassandra');
    return client;
  } catch (error) {
    console.error('❌ Error conectando a Cassandra:', error);
    throw error;
  }
};

// Función para inicializar tablas
const inicializarCassandra = async () => {
  try {
    console.log('🔧 Inicializando Cassandra...');

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
    console.log('✅ Tabla "usuarios" creada');

    await client.execute(`
      CREATE INDEX IF NOT EXISTS usuarios_email_idx 
      ON usuarios (email)
    `);
    console.log('✅ Índice "usuarios_email_idx" creado');

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
    console.log('✅ Tabla "bitacora" creada');

    console.log('🎉 Inicialización de Cassandra completada');
  } catch (error) {
    console.error('❌ Error inicializando Cassandra:', error);
    throw error;
  }
};

module.exports = { client, conectarCassandra, inicializarCassandra };
