'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _socket = require('socket.io-client');

var _socket2 = _interopRequireDefault(_socket);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var config = (0, _config2.default)();

var data = void 0;
var instance = void 0;
var err = void 0;

/* eslint no-return-await: 0, prefer-const: 0, no-underscore-dangle: 0, no-console: 0 */

var BaseService = function BaseService(model) {
  var _this = this;

  _classCallCheck(this, BaseService);

  this.create = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(body) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!body || body.constructor !== Object) {
                _this.__unprocessableEntity('Please pass in the right values for the body');
              }
              _context.next = 3;
              return _this.model.create(body);

            case 3:
              data = _context.sent;
              return _context.abrupt('return', data);

            case 5:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();

  this.fetchOne = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(key, value) {
      var ref;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _this.__checkArguments(key, value);
              ref = {};

              ref['' + key] = value;
              _context2.next = 5;
              return _this.model.findOne(ref);

            case 5:
              return _context2.abrupt('return', _context2.sent);

            case 6:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this);
    }));

    return function (_x2, _x3) {
      return _ref2.apply(this, arguments);
    };
  }();

  this.fetchAll = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _this.model.find({});

          case 2:
            return _context3.abrupt('return', _context3.sent);

          case 3:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, _this);
  }));

  this.deleteOne = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(key, value) {
      var ref;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _this.__checkArguments(key, value);
              ref = {};

              ref['' + key] = value;
              _context4.next = 5;
              return _this.model.findOneAndDelete(ref);

            case 5:
              return _context4.abrupt('return', true);

            case 6:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, _this);
    }));

    return function (_x4, _x5) {
      return _ref4.apply(this, arguments);
    };
  }();

  this.archiveOne = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(key, value) {
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return _this.updateOne(key, value, { archived: true });

            case 2:
              return _context5.abrupt('return', _context5.sent);

            case 3:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, _this);
    }));

    return function (_x6, _x7) {
      return _ref5.apply(this, arguments);
    };
  }();

  this.updateOne = function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(key, value, changes) {
      var ref;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _this.__checkArguments(key, value);
              ref = {};

              ref['' + key] = value;
              _context6.next = 5;
              return _this.model.findOne(ref);

            case 5:
              data = _context6.sent;

              Object.keys(changes).forEach(function (item) {
                if (Object.keys(data._doc).includes('' + item)) {
                  data['' + item] = changes['' + item];
                }
              });
              _context6.next = 9;
              return data.save();

            case 9:
              data = _context6.sent;
              return _context6.abrupt('return', data);

            case 11:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, _this);
    }));

    return function (_x8, _x9, _x10) {
      return _ref6.apply(this, arguments);
    };
  }();

  this.participate = function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(key, value, user) {
      var ref;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              ref = {};

              _this.__checkArguments(key, value);
              ref['' + key] = value;
              _context7.next = 5;
              return _this.model.findOne(ref);

            case 5:
              data = _context7.sent;

              if (data.members.map(function (item) {
                return item.id;
              }).includes(user.id)) {
                _context7.next = 12;
                break;
              }

              data.members.push(user);
              _context7.next = 10;
              return data.save();

            case 10:
              data = _context7.sent;
              return _context7.abrupt('return', data);

            case 12:
              err = new Error('You joined this already');
              err.status = 409;
              throw err;

            case 15:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, _this);
    }));

    return function (_x11, _x12, _x13) {
      return _ref7.apply(this, arguments);
    };
  }();

  this.leave = function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(key, value, user) {
      var ref;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _this.__checkArguments(key, value);
              ref = {};

              ref['' + key] = value;
              _context8.next = 5;
              return _this.model.findOne(ref);

            case 5:
              data = _context8.sent;

              data.members = data.members.filter(function (item) {
                return item.id !== user.id;
              });
              _context8.next = 9;
              return data.save();

            case 9:
              data = _context8.sent;
              return _context8.abrupt('return', data);

            case 11:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, _this);
    }));

    return function (_x14, _x15, _x16) {
      return _ref8.apply(this, arguments);
    };
  }();

  this.__updateUser = function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(body, access) {
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              instance = _axios2.default.create({ baseURL: config.baseUrl, headers: { Authorization: access } });
              instance.put('/user', body).then(function (response) {
                console.log('Successfully updated ' + response.data.data.username);
              }).catch(function (err) {
                console.log(err.message);
                return null;
              });

            case 2:
            case 'end':
              return _context9.stop();
          }
        }
      }, _callee9, _this);
    }));

    return function (_x17, _x18) {
      return _ref9.apply(this, arguments);
    };
  }();

  this.__dispatchToNotificationServer = function () {
    var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(mail, notification, key) {
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              instance = _axios2.default.create({ baseURL: config.notificationUrl });
              instance.post('/receive', { mail: mail, notification: notification, key: key }).then(function () {
                console.log('Successfully dispatched notification');
              });

            case 2:
            case 'end':
              return _context10.stop();
          }
        }
      }, _callee10, _this);
    }));

    return function (_x19, _x20, _x21) {
      return _ref10.apply(this, arguments);
    };
  }();

  this.__fetchUser = function () {
    var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(username, access) {
      var response;
      return regeneratorRuntime.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.prev = 0;
              _context11.next = 3;
              return _axios2.default.create({ baseURL: config.baseUrl, headers: { Authorization: access } });

            case 3:
              instance = _context11.sent;
              _context11.next = 6;
              return instance.post('/fetch', { user: { username: username } });

            case 6:
              response = _context11.sent;
              return _context11.abrupt('return', response.data);

            case 10:
              _context11.prev = 10;
              _context11.t0 = _context11['catch'](0);

              console.log(_context11.t0);
              return _context11.abrupt('return', null);

            case 14:
            case 'end':
              return _context11.stop();
          }
        }
      }, _callee11, _this, [[0, 10]]);
    }));

    return function (_x22, _x23) {
      return _ref11.apply(this, arguments);
    };
  }();

  this.fetchDataForUser = function () {
    var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(id) {
      return regeneratorRuntime.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _context12.next = 2;
              return _this.model.find({ $or: [{ 'origin.id': id }, { 'members.id': id }] }).sort({ createdAt: -1 });

            case 2:
              data = _context12.sent;

              data = data.filter(function (item) {
                return item;
              });
              return _context12.abrupt('return', data);

            case 5:
            case 'end':
              return _context12.stop();
          }
        }
      }, _callee12, _this);
    }));

    return function (_x24) {
      return _ref12.apply(this, arguments);
    };
  }();

  this.__checkArguments = function (key, value) {
    if (!key || !value || typeof key !== 'string') {
      _this.__unprocessableEntity('Something might be wrong with the values you passed in');
    }
  };

  this.__unprocessableEntity = function (message) {
    var e = new Error(message);
    e.status = 422;
    throw e;
  };

  this.__notFoundError = function () {
    var e = new Error('Sorry we could not find that resource');
    e.status = 404;
    throw e;
  };

  this.model = model;
}

// __dispatchToNotificationServer = (body, username) => {
//   const socket = io('config.notificationUrl/base');
//   socket.to(`room-${username}`).emit('new notification', body);
// }


;

exports.default = BaseService;