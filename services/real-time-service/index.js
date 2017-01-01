import express from 'express';
import socketServer from 'socket.io';
import logger from 'morgan';
import mongoose from 'mongoose';
import dispatchToDb from './interactors/'

const app = express();

const io = socketServer(app, {
  path: '/conversation',
  serveClient: true
})

const messageIO = socketServer(app, {
  path: '/base',
  serveClient: true
})

messageIO.on('connection', (socket) => {
  const room = socket.handshake.query.username
  if (room) {
    socket.join(`room-${room}`, () => {
      console.log(`${socket.id} is now connected`)
    });
}
});

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

app.listen(5000, () => {
  console.log('Real time service is now listening on port 5000')
});