const { MongoClient } = require('mongodb');
const url = 'mongodb://127.0.0.1:27017';
const dbName = 'blabla';

let db;

MongoClient.connect(url, { useUnifiedTopology: true })
    .then(client => {
        db = client.db(dbName);
    })
    .catch(error => {
        console.error('Database connection error:', error);
    });

module.exports = {
    findOne: async (query) => {
        return await db.collection('user').findOne(query);
    },

    findAll: async () => {
        return await db.collection('user').find().toArray();
    },

    // ... Diğer database işlemleriniz için benzer fonksiyonlar
};
