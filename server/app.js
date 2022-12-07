/* eslint-disable no-unused-vars */

require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const http = require('http');
const wss = require('./websocket/index');

const sessionParser = require('./src/middlewares/sessions');
const cors = require('./src/middlewares/cors');
const errorHandler = require('./src/middlewares/error');

const BaseRouter = require('./src/routers/api');

const app = express();

const PORT = process.env.PORT ?? 6622;

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors);
app.use(sessionParser);

app.use('/api', BaseRouter);

// app.use(errorHandler);

// app.use((err, req, res, next) => {
//   console.error('====>>>>', err.stack);
//   res.status(500).send('Something broke!');
// });

const server = http.createServer(app);

server.on('upgrade', (req, socket, head) => {
  sessionParser(req, {}, () => {
    if (!req.session.company) {
      socket.write('net sessii');
      socket.end();
    }
    wss.handleUpgrade(req, socket, head, (ws) => {
      wss.emit('connection', ws, req);
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server is up on ${PORT}`);
});
