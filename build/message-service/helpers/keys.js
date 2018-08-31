'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decodeToken = exports.key = exports.decodeKeyDev = exports.decodeKeyTest = undefined;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var decodeKeyTest = exports.decodeKeyTest = '6df7e61ce8cfc31f2c4f000fa5fcf7c0fb4c2395ea10818e2eb5e94efd008b022bae771d8fa30a4dc37dd06ed851554b5aa40e7b40dfb39acbc7a4282520c20a';
var decodeKeyDev = exports.decodeKeyDev = '6df7e61ce8cfc31f2c4f000fa5fcf7c0fb4c2395ea10818e2eb5e94efd008b022bae771d8fa30a4dc37dd06ed851554b5aa40e7b40dfb39acbc7a4282520c20a';

var key = exports.key = process.env.NODE_ENV === 'dev' ? decodeKeyDev : decodeKeyTest;
var decodeToken = exports.decodeToken = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(token) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _jsonwebtoken2.default.verify(token, key);

          case 2:
            return _context.abrupt('return', _context.sent);

          case 3:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function decodeToken(_x) {
    return _ref.apply(this, arguments);
  };
}();