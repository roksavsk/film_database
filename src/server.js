import express from 'express';
import NodeCache from 'node-cache';
import redis from 'redis';
import dotenv from 'dotenv';
import pkg from 'body-parser';

import client from './models/db.js';
const { json } = pkg;
dotenv.config();

const port =  process.env.PORT || 3000;
const app = express();

const cache = new NodeCache();

const redisClient = redis.createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOSTNAME,
        port: process.env.REDIS_PORT,
    },
});

redisClient.on('error', err => console.log('Redis Client Error', err));

await redisClient.connect();

app.use(json());

app.get('/', async (req, res) => {
    res.send('Welcome to film database!');
});

app.get('/film/:title', async (request, response) => {
    const title = request.params.title;

    const getFilm = async (name) => {
        return new Promise((resolve, reject) => {
            client.query('SELECT * FROM film WHERE title = $1', [name], (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results.rows);
            });
        });
    };
    
    try {
        let data = cache.get(title);
        console.log('node', data);
        if (data === undefined) {
            data = JSON.parse(await redisClient.get(title));
            console.log('redis', data);
        }
        if (data === null) {
            data = await getFilm(title);
            cache.set(title, data, 15);
            redisClient.set(title, JSON.stringify(data), {
                EX: 30,
                NX: true,
            });
        }
        response.status(200).json(data);
    } catch (err) {
        console.log(err);
        response.sendStatus(500);
    } 

});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
