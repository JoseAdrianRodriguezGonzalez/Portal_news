const { createClient } = require('redis');

const client = createClient({
    url: "redis://default:OFCIHTDnapnFWRhylBSpiLzqHcwduFMh@centerbeam.proxy.rlwy.net:13511"   //`redis://${process.env.REDIS_HOST || 'redis'}:6379`
});

client.on('error', (err) => console.log('Error de Cliente Redis', err));

const conectarRedis = async () => {
    try {
        await client.connect();
        console.log('Redis Conectado');
    } catch (error) {
        console.error('Error conectando a Redis:', error);
    }
};

module.exports = { client, conectarRedis };