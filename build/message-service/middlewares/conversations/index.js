'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _base = require('../base');

var _conversation = require('../../models/conversation');

var _conversation2 = _interopRequireDefault(_conversation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var err = void 0;
var data = void 0;
var source = void 0;

/* eslint max-len: 0, radix: 0, no-restricted-globals: 0 */

var ConvoMiddlewareBase = function (_BaseMiddlewareBase) {
  _inherits(ConvoMiddlewareBase, _BaseMiddlewareBase);

  function ConvoMiddlewareBase() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    _classCallCheck(this, ConvoMiddlewareBase);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ConvoMiddlewareBase.__proto__ || Object.getPrototypeOf(ConvoMiddlewareBase)).call.apply(_ref, [this].concat(args))), _this), _this.grantAccess = function (req, res, next) {
      if (!req.query.type || isNaN(parseInt(req.query.type))) {
        err = new Error('Please, send in the right type of conversation');
        err.status = 400;
        return next(err);
      }
      if (parseInt(req.query.type) > 1) {
        if (req.user.role > 3) return next();

        err = new Error('You do not have permissions to do that');
        err.status = 401;
        return next(err);
      }
      if (req.user.role > 0) return next();
      err = new Error('You do not have permissions to do that');
      err.status = 401;
      return next(err);
    }, _this.appendType = function (req, res, next) {
      req.body.type = req.query.type;
      return next();
    }, _this.checkRequired = function (req, res, next) {
      if (parseInt(req.query.type) < 2) return next();
      var requiredForDebate = ['topic'];
      var requiredForTownHall = ['focus', 'endDate', 'startDate', 'details'];
      if (parseInt(req.query.type) > 2) {
        data = requiredForTownHall.map(function (item) {
          return req.body['' + item];
        }).filter(function (item) {
          return !item;
        });
        if (data.length === 0) return next();
        err = new Error('Some required fields to set up this town hall are missing');
        err.status = 422;
        return next(err);
      }

      data = requiredForDebate.map(function (item) {
        return req.body['' + item];
      }).filter(function (item) {
        return !item;
      });
      if (data.length === 0) return next();
      err = new Error('Some required fields to set up this debate are missing');
      err.status = 400;
      return next(err);
    }, _this.restrictAccess = function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
        var _data, members;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _this.model.findById(req.params.id);

              case 2:
                data = _context.sent;

                if (!data) {
                  _context.next = 11;
                  break;
                }

                _data = data, members = _data.members;

                data = members.map(function (item) {
                  return item.id;
                }).filter(function (item) {
                  return item;
                });

                if (!(data.includes(req.user.id) || req.user.role > 3)) {
                  _context.next = 8;
                  break;
                }

                return _context.abrupt('return', next());

              case 8:
                err = new Error('You do not have permissions to view these messages');
                err.status = 401;
                return _context.abrupt('return', next(err));

              case 11:
                err = new Error('We couldnt find such a conversation');
                err.status = 404;
                return _context.abrupt('return', next(err));

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
    }(), _this.filterAccess = function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
        var _data2, invites, granted;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _this.model.findById(req.params.id);

              case 2:
                data = _context2.sent;

                if (!(data && data.type === 1)) {
                  _context2.next = 13;
                  break;
                }

                _data2 = data, invites = _data2.invites;

                source = invites.map(function (item) {
                  return item.id;
                }).filter(function (item) {
                  return item;
                });

                if (!(source.includes(req.user.id) || req.user.role > 3)) {
                  _context2.next = 10;
                  break;
                }

                if (!(data.members > 2 || source.includes(req.user.id))) {
                  _context2.next = 9;
                  break;
                }

                return _context2.abrupt('return', next());

              case 9:
                return _context2.abrupt('return', _this.noPermissions('You cannot join a personal conversation, because you havent been invited', next));

              case 10:
                return _context2.abrupt('return', _this.noPermissions('You cannot join a personal conversation, because you havent been invited', next));

              case 13:
                if (!(data && data.type === 3)) {
                  _context2.next = 17;
                  break;
                }

                granted = false;

                Object.keys(data.details.inclusion).forEach(function (key) {
                  if (req.user['' + key] && req.user['' + key] === data.details.inclusion['' + key]) {
                    granted = true;
                  }
                  granted = false;
                });
                //       if (granted) 
                return _context2.abrupt('return', next());

              case 17:
                if (!data) {
                  _context2.next = 19;
                  break;
                }

                return _context2.abrupt('return', next());

              case 19:
                return _context2.abrupt('return', _this.notFound('You cannot join a personal conversation, because you havent been invited', next));

              case 20:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this2);
      }));

      return function (_x4, _x5, _x6) {
        return _ref3.apply(this, arguments);
      };
    }(), _temp), _possibleConstructorReturn(_this, _ret);
  }

  return ConvoMiddlewareBase;
}(_base.BaseMiddlewareBase);

var ConversationMiddleware = new ConvoMiddlewareBase(_conversation2.default);

exports.default = ConversationMiddleware;