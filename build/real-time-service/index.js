'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _interactors = require('./interactors/');

var _interactors2 = _interopRequireDefault(_interactors);

var _controllers = require('./controllers/');

var _controllers2 = _interopRequireDefault(_controllers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var server = require('http').Server(app);

var io = (0, _socket2.default)(server, {
  path: '/',
  serveClient: false
});

app.use(_controllers.ErrorHandlerController).use(_bodyParser2.default.json()).use(_bodyParser2.default.urlencoded({ extended: false })).use((0, _cors2.default)()).use((0, _morgan2.default)('dev'));

app.post('/receive', _controllers2.default);

var chatSocket = io.of('/conversation').on('connection', function (socket) {
  var identifier = socket.handshake.query.convoID;
  socket.join('conversation-' + identifier, function () {
    console.log(socket.id + ' has now joined conversation ' + identifier);
  });
  socket.on('new-message', function (data) {
    console.log(data);
    socket.broadcast.to('conversation-' + data.destination).emit('incoming-message', data);
    (0, _interactors2.default)(data);
  });
});

// console.log(chat);

server.listen(5000, function () {
  console.log('Real time service is now listening on port 5000');
});

exports.default = { io: io };