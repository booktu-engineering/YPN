'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _conversationService = require('../services/conversation-service');

var _conversationService2 = _interopRequireDefault(_conversationService);

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var data = void 0;
/* eslint no-underscore-dangle: 0 */

var ConversationControllerBase = function (_BaseController) {
  _inherits(ConversationControllerBase, _BaseController);

  function ConversationControllerBase() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    _classCallCheck(this, ConversationControllerBase);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ConversationControllerBase.__proto__ || Object.getPrototypeOf(ConversationControllerBase)).call.apply(_ref, [this].concat(args))), _this), _this.getTimeLine = function (req, res, next) {
      _this.__wrapInTryCatch(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                data = _this.service.getTimeline(req.body);
                _this.__responseOkay(res, data);

              case 2:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this2);
      })), next);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return ConversationControllerBase;
}(_base2.default);

var ConversationController = new ConversationControllerBase(_conversationService2.default);
exports.default = ConversationController;