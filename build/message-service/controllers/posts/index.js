'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _postService = require('../../services/post-service');

var _postService2 = _interopRequireDefault(_postService);

var _base = require('../base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var data = void 0;
var comments = void 0;
/* eslint no-underscore-dangle: 0 */

var PostControllerBase = function (_BaseController) {
  _inherits(PostControllerBase, _BaseController);

  function PostControllerBase() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    _classCallCheck(this, PostControllerBase);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PostControllerBase.__proto__ || Object.getPrototypeOf(PostControllerBase)).call.apply(_ref, [this].concat(args))), _this), _this.getTimeline = function (req, res, next) {
      _this.__wrapInTryCatch(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var user, access;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                user = req.user, access = req.access;
                _context.next = 3;
                return _this.service.getTimeline(user.username, access);

              case 3:
                data = _context.sent;

                _this.__responseOkay(res, data);

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this2);
      })), next);
    }, _this.fetchAllPosts = function (req, res, next) {
      _this.__wrapInTryCatch(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var user, access;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                user = req.user, access = req.access;
                _context2.next = 3;
                return _this.service.fetchAllPosts(req.params.id);

              case 3:
                data = _context2.sent;

                _this.__responseOkay(res, data);

              case 5:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this2);
      })), next);
    }, _this.like = function (req, res, next) {
      _this.__wrapInTryCatch(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var user;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                user = req.user;
                _context3.next = 3;
                return _this.service.like('_id', req.params.id, user, parseInt(req.query.type));

              case 3:
                data = _context3.sent;

                _this.__responseOkay(res, data);

              case 5:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, _this2);
      })), next);
    }, _this.fetchOne = function (req, res, next) {
      _this.__wrapInTryCatch(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _this.service.fetchOne('_id', req.params.id);

              case 2:
                data = _context4.sent;
                _context4.next = 5;
                return _this.service.fetchComments(data);

              case 5:
                comments = _context4.sent;

                _this.__responseOkay(res, { data: data, comments: comments });

              case 7:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, _this2);
      })), next);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return PostControllerBase;
}(_base2.default);

var PostsController = new PostControllerBase(_postService2.default);

exports.default = PostsController;