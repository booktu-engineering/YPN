'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _question = require('../../models/question');

var _question2 = _interopRequireDefault(_question);

var _base = require('../base');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var QuestionMiddlewareBase = function (_BaseMiddlewareBase) {
  _inherits(QuestionMiddlewareBase, _BaseMiddlewareBase);

  function QuestionMiddlewareBase() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, QuestionMiddlewareBase);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = QuestionMiddlewareBase.__proto__ || Object.getPrototypeOf(QuestionMiddlewareBase)).call.apply(_ref, [this].concat(args))), _this), _this.appendUser = function (req, res, next) {
      req.body.user = req.user;
      next();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return QuestionMiddlewareBase;
}(_base.BaseMiddlewareBase);

var QuestionMiddleware = new QuestionMiddlewareBase(_question2.default);
exports.default = QuestionMiddleware;