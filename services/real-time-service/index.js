import express from 'express';
import bodyParser from 'body-parser';
import socketServer from 'socket.io';
import cors from 'cors';
import logger from 'morgan';
import mongoose from 'mongoose';
import dispatchToDb from './interactors/';
import NotificationHandler, { ErrorHandlerController } from './controllers/';

const app = express();
const server = require('http').Server(app);

const io = socketServer(server, {
  path: '/',
  serveClient: false
});

app.use(ErrorHandlerController)
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(cors())
  .use(logger('dev'));


app.post('/receive', NotificationHandler);


const chatSocket = io
  .of('/conversation')
  .on('connection', (socket) => {
    const identifier = socket.handshake.query.convoID;
    socket.join(`conversation-${identifier}`, () => {
      console.log(`${socket.id} has now joined conversation ${identifier}`);
    });
    socket.on('new-message', (data) => {
      console.log(data);
      socket.broadcast.to(`conversation-${data.destination}`).emit('incoming-message', data);
      dispatchToDb(data);
    });
  });

// console.log(chat);

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Notification Service is listening on ${port}`);
});

export default { io };
