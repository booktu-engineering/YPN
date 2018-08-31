'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _question = require('../models/question');

var _question2 = _interopRequireDefault(_question);

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var data = void 0;
var responses = void 0;

/* eslint no-underscore-dangle: 0, max-len: 0 */

var QuestionServiceBase = function (_BaseService) {
  _inherits(QuestionServiceBase, _BaseService);

  function QuestionServiceBase() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    _classCallCheck(this, QuestionServiceBase);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = QuestionServiceBase.__proto__ || Object.getPrototypeOf(QuestionServiceBase)).call.apply(_ref, [this].concat(args))), _this), _this.createSync = function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(body) {
        var obj;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // this.__sanitizeInput(body);
                obj = { questions: {}, options: {}, responses: [] };

                obj.title = body.title;
                // assuming the questions look like this { name: 'Ati', questions: [{question: 'nfnkfn', options: [okd, onn]}]}
                body.questions.forEach(function (object, index) {
                  var ref = {};
                  obj.questions['' + index] = object.question;
                  object.options.forEach(function (q) {
                    ref['' + q] = 0;
                  });
                  obj.options['' + index] = ref;
                });
                obj = _extends({}, body, obj);
                _context.next = 6;
                return _this.create(obj);

              case 6:
                data = _context.sent;
                return _context.abrupt('return', data);

              case 8:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this2);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }(), _this.filterResponses = function (data, user) {
      var filterX = data.responses.filter(function (item) {
        return item.user.id === user.id;
      });
      if (filterX.length) return false;
      return true;
    }, _this.respond = function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(response) {
        var _data, options, userResponse, ref, dataX;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _this.model.findById(response.id);

              case 2:
                data = _context2.sent;

                if (!(data && response.responses && response.responses.constructor === Array)) {
                  _context2.next = 17;
                  break;
                }

                if (_this.filterResponses(data, response.user)) {
                  _context2.next = 6;
                  break;
                }

                return _context2.abrupt('return', _this.__unprocessableEntity("Looks like you've voted earlier"));

              case 6:
                _data = data, options = _data.options;

                response.responses.forEach(function (item) {
                  var opt = Object.entries(item)[0];
                  if (Object.keys(data.options['' + opt[0]]).includes('' + opt[1])) {
                    data.options['' + opt[0]]['' + opt[1]] += 1;
                  }
                });
                userResponse = {};
                ref = {};

                userResponse.user = response.user;
                userResponse.reasons = [];
                if (response.reasons && _typeof(response.reasons) === 'object') {
                  Object.keys(response.reasons).forEach(function (key, index) {
                    ref['' + key] = Object.values(response.reasons)['' + index];
                  });
                  userResponse.reasons.push(ref);
                  data.responses.push(userResponse);
                }
                _context2.next = 15;
                return _this.model.findByIdAndUpdate(data._id, { $set: { options: data.options, responses: data.responses } });

              case 15:
                dataX = _context2.sent;
                return _context2.abrupt('return', data);

              case 17:
                _this.__notFoundError();

              case 18:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this2);
      }));

      return function (_x2) {
        return _ref3.apply(this, arguments);
      };
    }(), _this.fetchResults = function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(key, value) {
        var results;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _this.fetchOne(key, value);

              case 2:
                data = _context3.sent;

                if (!data) {
                  _context3.next = 7;
                  break;
                }

                results = {};

                Object.values(data.questions).forEach(function (item, index) {
                  results['' + index] = { question: item, answers: data.options['' + index] };
                  if (data.responses.length > 0) {
                    var response = data.responses.map(function (res) {
                      if (res.reasons[0]['' + index]) {
                        var dt = {};
                        dt.user = res.user;
                        dt.reason = res.reasons[0]['' + index];
                        return dt;
                      }
                    }).filter(function (item) {
                      return item;
                    });
                    results['' + index].response = response;
                  }
                });
                return _context3.abrupt('return', results);

              case 7:
                _this.__notFoundError();

              case 8:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, _this2);
      }));

      return function (_x3, _x4) {
        return _ref4.apply(this, arguments);
      };
    }(), _temp), _possibleConstructorReturn(_this, _ret);
  }
  // rewrite create function


  return QuestionServiceBase;
}(_base2.default);

var QuestionService = new QuestionServiceBase(_question2.default);

exports.default = QuestionService;