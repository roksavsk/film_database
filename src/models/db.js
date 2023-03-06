import pkg from 'pg';
const { Client } = pkg;

import dotenv from 'dotenv';

dotenv.config();

const conString = process.env.DB_URL;
const client = new Client(conString);
client.connect(function (err) {
    if (err) {
        return console.error('Could not connect to postgres', err);
    }
    console.log('Database connection established');
});

export default client;