# Film database - Node.js, PostgreSQL, Redis

The server on Node.js connected to the PostgreSQL database with films using node-cache and Redis to cache data.

## Installation instructions

Follow the instructions below to install and start project:

Clone project.

```bash
git clone https://github.com/roksavsk/film_database.git
```

Change into film_database directory.

```bash
$ cd film_database/
```

Install dependencies.

```bash
$ npm install
```

Start app.

```bash
$ npm start
```

Using a browser navigate to the address http://localhost:3000.

```bash
http://localhost:3000
```

## Test service

To test the app and see info about the film go to http://localhost:3000/film/:title using one of the example movie titles instead of the title parameter.

Film titles: Galaxy Sweethearts, Chamber Italian, Autumn Crow, Devil Desire, 	Ballroom Mockingbird.

Use Postman to see the difference in time between retrieving data from database and cache.