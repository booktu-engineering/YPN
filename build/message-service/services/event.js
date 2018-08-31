'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _event = require('../models/event');

var _event2 = _interopRequireDefault(_event);

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var config = (0, _config2.default)();

/* eslint no-underscore-dangle: 0, prefer-const: 0 */
var ref = {};
var data = void 0;
var err = new Error();

/* eslint no-useless-constructor: 0 */

var EventServiceBase = function (_BaseService) {
  _inherits(EventServiceBase, _BaseService);

  function EventServiceBase() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    _classCallCheck(this, EventServiceBase);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = EventServiceBase.__proto__ || Object.getPrototypeOf(EventServiceBase)).call.apply(_ref, [this].concat(args))), _this), _this.attendEvent = function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(key, value, user) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this.__checkArguments(key, value);
                ref['' + key] = value;
                _context.next = 4;
                return _this.model.findOne(ref);

              case 4:
                data = _context.sent;

                if (data.members.map(function (item) {
                  return item.id;
                }).includes(user.id)) {
                  _context.next = 11;
                  break;
                }

                data.members.push(user);
                _context.next = 9;
                return data.save();

              case 9:
                data = _context.sent;
                return _context.abrupt('return', data);

              case 11:
                err = new Error('You joined this already');
                err.status = 409;
                throw err;

              case 14:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this2);
      }));

      return function (_x, _x2, _x3) {
        return _ref2.apply(this, arguments);
      };
    }(), _this.fetchAllSync = function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(role) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _this.fetchAll();

              case 2:
                data = _context2.sent;

                console.log('bro');
                console.log(data);
                return _context2.abrupt('return', data);

              case 6:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this2);
      }));

      return function (_x4) {
        return _ref3.apply(this, arguments);
      };
    }(), _this.leaveEvent = function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(key, value, user) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _this.__checkArguments(key, value);
                ref['' + key] = value;
                _context3.next = 4;
                return _this.model.findOne(ref);

              case 4:
                data = _context3.sent;

                data.members = data.members.filter(function (item) {
                  return item.id !== user.id;
                });
                _context3.next = 8;
                return data.save();

              case 8:
                data = _context3.sent;
                return _context3.abrupt('return', data);

              case 10:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, _this2);
      }));

      return function (_x5, _x6, _x7) {
        return _ref4.apply(this, arguments);
      };
    }(), _this.fetchEventsForUser = function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(id) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _this.model.find({});

              case 2:
                data = _context4.sent;

                data = data.map(function (event) {
                  var members = event.members.map(function (item) {
                    return item.id;
                  }).filter(function (item) {
                    return item;
                  });
                  if (members.includes(id) || event.origin.id === id) return event;
                  return null;
                });
                data = data.filter(function (item) {
                  return item;
                });
                return _context4.abrupt('return', data);

              case 6:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, _this2);
      }));

      return function (_x8) {
        return _ref5.apply(this, arguments);
      };
    }(), _this.fetchMembers = function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(key, value) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _this.__checkArguments(key, value);
                ref['' + key] = value;
                _context5.next = 4;
                return _this.model.findOne(ref);

              case 4:
                data = _context5.sent;
                _context5.next = 7;
                return _axios2.default.method({ method: 'POST', url: '', body: { data: data.attendees } });

              case 7:
                res = _context5.sent;

              case 8:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, _this2);
      }));

      return function (_x9, _x10) {
        return _ref6.apply(this, arguments);
      };
    }(), _temp), _possibleConstructorReturn(_this, _ret);
  }

  return EventServiceBase;
}(_base2.default);

var EventService = new EventServiceBase(_event2.default);

exports.default = EventService;