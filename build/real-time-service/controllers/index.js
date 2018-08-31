'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ErrorHandlerController = undefined;

var _notifications = require('../interactors/notifications');

var _notifications2 = _interopRequireDefault(_notifications);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var status = void 0;
var message = void 0;

var ErrorHandlerController = exports.ErrorHandlerController = function ErrorHandlerController(req, res, next, err) {
  status = err.status ? err.status : 500;
  message = err.message ? err.message : 'Something went wrong please try again';
  res.status(status).json({ message: message });
};

var NotificationHandler = function NotificationHandler(req, res, next) {
  try {
    _notifications2.default.interact(req.body);
    res.status(200).json({ ok: true });
  } catch (e) {
    console.log(e);
    next(e);
  }
};

exports.default = NotificationHandler;