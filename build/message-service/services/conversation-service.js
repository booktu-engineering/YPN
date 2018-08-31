'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _conversation = require('../models/conversation');

var _conversation2 = _interopRequireDefault(_conversation);

var _post = require('../models/post');

var _post2 = _interopRequireDefault(_post);

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var data = void 0;
var ref = {};
/* eslint no-underscore-dangle: 0, no-return-await: 0, prefer-const: 0 */

var ConversationService = function (_BaseService) {
  _inherits(ConversationService, _BaseService);

  function ConversationService() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    _classCallCheck(this, ConversationService);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ConversationService.__proto__ || Object.getPrototypeOf(ConversationService)).call.apply(_ref, [this].concat(args))), _this), _this.fetchOne = function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(key, value) {
        var messages;
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

                if (!data) {
                  _context.next = 10;
                  break;
                }

                _context.next = 8;
                return data.getMessages();

              case 8:
                messages = _context.sent;
                return _context.abrupt('return', _extends({}, data._doc, { messages: messages }));

              case 10:
                return _context.abrupt('return', null);

              case 11:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this2);
      }));

      return function (_x, _x2) {
        return _ref2.apply(this, arguments);
      };
    }(), _this.getTimeline = function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(body) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (body.constructor !== Array) {
                  _this.__unprocessableEntity();
                }
                _context2.next = 3;
                return _post2.default.find({ type: 1, referenceID: null }).sort({ createdAt: -1 });

              case 3:
                data = _context2.sent;

                data = data.filter(function (item) {
                  return body.includes(item.origin.id);
                });
                return _context2.abrupt('return', data);

              case 6:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this2);
      }));

      return function (_x3) {
        return _ref3.apply(this, arguments);
      };
    }(), _this.getSpecific = function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(type) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _this.model.find({ type: parseInt(type) });

              case 2:
                data = _context3.sent;
                return _context3.abrupt('return', data);

              case 4:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, _this2);
      }));

      return function (_x4) {
        return _ref4.apply(this, arguments);
      };
    }(), _this.extendInvite = function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(key, value, user) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _this.__checkArguments(key, value);
                ref['' + key] = value;
                _context4.next = 4;
                return _this.model.findOne(ref);

              case 4:
                data = _context4.sent;

                if (!data) {
                  _context4.next = 21;
                  break;
                }

                if (!(data.invites < 1)) {
                  _context4.next = 14;
                  break;
                }

                data.invites.push(user);
                _context4.next = 10;
                return data.save();

              case 10:
                data = _context4.sent;
                return _context4.abrupt('return', data);

              case 14:
                if (!data.invites.map(function (item) {
                  return item.id;
                }).includes(user.id)) {
                  _context4.next = 16;
                  break;
                }

                return _context4.abrupt('return', data);

              case 16:
                data.invites.push(user);
                _context4.next = 19;
                return data.save();

              case 19:
                data = _context4.sent;
                return _context4.abrupt('return', data);

              case 21:
                return _context4.abrupt('return', null);

              case 22:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, _this2);
      }));

      return function (_x5, _x6, _x7) {
        return _ref5.apply(this, arguments);
      };
    }(), _temp), _possibleConstructorReturn(_this, _ret);
  }

  return ConversationService;
}(_base2.default);

var ConversationServiceObject = new ConversationService(_conversation2.default);

exports.default = ConversationServiceObject;