'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _base = require('../base');

var _post = require('../../models/post');

var _post2 = _interopRequireDefault(_post);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var data = void 0;
var err = void 0;

var PostMiddlewareBase = function (_BaseMiddlewareBase) {
  _inherits(PostMiddlewareBase, _BaseMiddlewareBase);

  function PostMiddlewareBase() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    _classCallCheck(this, PostMiddlewareBase);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PostMiddlewareBase.__proto__ || Object.getPrototypeOf(PostMiddlewareBase)).call.apply(_ref, [this].concat(args))), _this), _this.appendOrigin = function (req, res, next) {
      req.body.origin = req.user;
      next();
    }, _this.contentOnlyEditable = function (req, res, next) {
      req.body = Object.assign({}, { content: req.body.content });
      next();
    }, _this.revokeAccess = function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _this.model.findById(req.params.id);

              case 2:
                data = _context.sent;

                if (!data) {
                  _context.next = 9;
                  break;
                }

                if (!(data.origin.id === req.user.id && data.destination === null)) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt('return', next());

              case 6:
                err = new Error('You are not permitted to do that');
                err.status = 401;
                return _context.abrupt('return', next(err));

              case 9:
                err = new Error('There is no such resource');
                err.status = 404;
                return _context.abrupt('return', next(err));

              case 12:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this2);
      }));

      return function (_x, _x2, _x3) {
        return _ref2.apply(this, arguments);
      };
    }(), _temp), _possibleConstructorReturn(_this, _ret);
  }

  return PostMiddlewareBase;
}(_base.BaseMiddlewareBase);

var PostMiddleware = new PostMiddlewareBase(_post2.default);

exports.default = PostMiddleware;