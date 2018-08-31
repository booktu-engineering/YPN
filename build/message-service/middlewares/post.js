'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _base = require('./base');

var _post = require('../models/post');

var _post2 = _interopRequireDefault(_post);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var err = void 0;
var data = void 0;
/* eslint radix: 0 */

var PostMiddlewareBase = function (_BaseMiddlewareBase) {
  _inherits(PostMiddlewareBase, _BaseMiddlewareBase);

  function PostMiddlewareBase(model) {
    var _this2 = this;

    _classCallCheck(this, PostMiddlewareBase);

    var _this = _possibleConstructorReturn(this, (PostMiddlewareBase.__proto__ || Object.getPrototypeOf(PostMiddlewareBase)).call(this));

    _this.__blockEditAndDelete = function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _this.model.findById(parseInt(req.params.id));

              case 2:
                data = _context.sent;

                if (!(!data || data.type === 2)) {
                  _context.next = 7;
                  break;
                }

                err = new Error('Sorry, you cannot edit or delete messages');
                err.status = 401;
                return _context.abrupt('return', next(err));

              case 7:
                next();

              case 8:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this2);
      }));

      return function (_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      };
    }();

    _this.__revokeAccess = function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _this.model.findById(parseInt(req.params.id));

              case 2:
                data = _context2.sent;

                if (!(data.origin.id !== req.user.id || req.user.role > 4)) {
                  _context2.next = 7;
                  break;
                }

                err = new Error('Sorry, you cannot make changes to this post');
                err.status = 401;
                return _context2.abrupt('return', next(err));

              case 7:
                next();

              case 8:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this2);
      }));

      return function (_x4, _x5, _x6) {
        return _ref2.apply(this, arguments);
      };
    }();

    _this.model = model;
    return _this;
  }

  return PostMiddlewareBase;
}(_base.BaseMiddlewareBase);

var PostMiddleware = new PostMiddlewareBase(_post2.default);
exports.default = PostMiddleware;