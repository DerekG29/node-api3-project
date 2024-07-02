const express = require('express');
const usersRouter = require('./users/users-router');

const { logger } = require('./middleware/middleware');

const server = express();

server.use(express.json());
server.use(logger);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use((error, req, res, next) => { // eslint-disable-line
  console.error(error);
  res.status(500).json({ message: 'Error performing the required operation' });
})

module.exports = server;
