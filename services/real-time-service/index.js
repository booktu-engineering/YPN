import express from 'express';
import bodyParser from 'body-parser';
import socketServer from 'socket.io';
import logger from 'morgan';
import mongoose from 'mongoose';
import dispatchToDb from './interactors/';
import NotificationHandler, { ErrorHandlerController } from './controllers/';

const app = express();
const server = require('http').Server(app);

const io = socketServer(server, {
  path: '/conversation',
  serveClient: false
});

const messageIO = socketServer(server, {
  path: '/base',
  serveClient: false
});

messageIO.on('connection', (socket) => {
  const room = socket.handshake.query.username;
  if (room) {
    socket.join(`room-${room}`, () => {
      console.log(`${socket.id} is now connected`);
    });
  };
});

app.use(ErrorHandlerController)
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(logger('dev'));


io.on('connection', (socket) => {
  const identifier = socket.handshake.query.convoID;
  socket.join(`conversation-${identifier}`, () => {
    console.log(`${socket.id} has now joined conversation ${identifier}`);
  });
  socket.on(`new-message-${socket.id}`, (data) => {
    socket.to(`conversation-${data.destination}`).emit('incoming-message', data);
    dispatchToDb(data);
  });
});

app.post('/receive', NotificationHandler);

const port = process.env.PORT || 5000
server.listen(port, () => {
  console.log(`Notification Service is listening on ${port}`)
});

export default { io, messageIO }
