'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _donation = require('../models/donation');

var _donation2 = _interopRequireDefault(_donation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var data = void 0;
/* eslint max-len: 0, prefer-const: 0, no-underscore-dangle: 0, no-return-await: 0 */

var DonationServiceBase = function (_BaseService) {
  _inherits(DonationServiceBase, _BaseService);

  function DonationServiceBase() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    _classCallCheck(this, DonationServiceBase);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DonationServiceBase.__proto__ || Object.getPrototypeOf(DonationServiceBase)).call.apply(_ref, [this].concat(args))), _this), _this.donate = function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(body) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this.__sanitizeInput(body);
                _context.next = 3;
                return _this.model.findById(body.id);

              case 3:
                data = _context.sent;

                if (!data) {
                  _context.next = 10;
                  break;
                }

                data.amount += body.amount;
                data.references.push(body);
                _context.next = 9;
                return data.save();

              case 9:
                return _context.abrupt('return', _context.sent);

              case 10:
                _this.__notFoundError('Sorry we couldnt find any donation like that');

              case 11:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this2);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }(), _this.__sanitizeInput = function (body) {
      if (!body || !body.id || body.constructor !== Object || !body.amount || body.amount.constructor !== Number || !body.referenceID || !body.date || body.date.constructor === Date || !body.user || body.user.constructor !== Object) {
        var e = new Error('Sorry thats an invalid donation');
        e.status = 422;
        throw e;
      }
    }, _this.fetchOneSync = function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(key, value) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _this.fetchOne(key, value);

              case 2:
                data = _context2.sent;

                if (data) {
                  data = _extends({}, data._doc, { status: data.getStatus() });
                }
                return _context2.abrupt('return', data);

              case 5:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this2);
      }));

      return function (_x2, _x3) {
        return _ref3.apply(this, arguments);
      };
    }(), _temp), _possibleConstructorReturn(_this, _ret);
  }

  return DonationServiceBase;
}(_base2.default);

var DonationService = new DonationServiceBase(_donation2.default);
exports.default = DonationService;