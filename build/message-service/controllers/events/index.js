'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _base = require('../base');

var _base2 = _interopRequireDefault(_base);

var _event = require('../../services/event');

var _event2 = _interopRequireDefault(_event);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var data = void 0;
/* eslint no-underscore-dangle: 0, radix: 0 */

var EventControllerBase = function (_BaseController) {
  _inherits(EventControllerBase, _BaseController);

  function EventControllerBase() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    _classCallCheck(this, EventControllerBase);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = EventControllerBase.__proto__ || Object.getPrototypeOf(EventControllerBase)).call.apply(_ref, [this].concat(args))), _this), _this.confirm = function (req, res, next) {
      _this.__wrapInTryCatch(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _this.service.updateOne('_id', req.params.id, { valid: true });

              case 2:
                data = _context.sent;

                _this.__responseOkay(res, data);

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this2);
      })), next);
    }, _this.fetchEventsForUser = function (req, res, next) {
      _this.__wrapInTryCatch(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _this.service.fetchEventsForUser(parseInt(req.params.id));

              case 2:
                data = _context2.sent;

                _this.__responseOkay(res, data);

              case 4:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this2);
      })), next);
    }, _this.deleteOne = function (req, res, next) {
      _this.__wrapInTryCatch(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _this.service.archiveOne('_id', req.params.id);

              case 2:
                data = _context3.sent;

                _this.__responseOkay(res, data);

              case 4:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, _this2);
      })), next);
    }, _this.fetchAll = function (req, res, next) {
      _this.__wrapInTryCatch(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _this.service.fetchAll();

              case 2:
                data = _context4.sent;

                if (!(req.user.role > 3)) {
                  _context4.next = 5;
                  break;
                }

                return _context4.abrupt('return', _this.__responseOkay(res, data));

              case 5:
                data = data.filter(function (item) {
                  return !item.archived;
                });
                return _context4.abrupt('return', _this.__responseOkay(res, data));

              case 7:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, _this2);
      })), next);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return EventControllerBase;
}(_base2.default);

var EventController = new EventControllerBase(_event2.default);
exports.default = EventController;