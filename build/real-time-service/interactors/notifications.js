'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _ = require('../');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var instance = void 0;

var NotificationInteractorB = function NotificationInteractorB() {
  _classCallCheck(this, NotificationInteractorB);

  this.mailer = _axios2.default.create({ baseURL: 'http://localhost:3500/' });
};

NotificationInteractorB.interact = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(body) {
    var messageIO;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;

            instance = _axios2.default.create({ baseURL: 'http://localhost:3500/' });
            instance.post('/sendmail/?key=' + body.key, _extends({ username: body.notification.destination }, body.mail)).then(function (response) {
              console.log(response.data);
            }).catch(function (err) {
              console.log(err);
            });

            messageIO = _2.default.messageIO;

            messageIO.to('room-' + body.notification.destination).emit('New-notif', body.notification);
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context['catch'](0);
            throw _context.t0;

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 7]]);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = NotificationInteractorB;