const mongoose = require('mongoose');
const dns = require('dns');

// Solución al problema de 'querySrv ECONNREFUSED' con Atlas en redes locales
dns.setServers(['8.8.8.8', '8.8.4.4']);

const connection = async () => {
    try {
        await mongoose.connect('mongodb+srv://luisiy0-user:rGhuRzcVBnMYK2Nv@mongodbcluster.wm0mle9.mongodb.net/?appName=MongoDBCluster/bdPortafolio');

        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

module.exports = connection;