'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseMiddlewareBase = undefined;

var _keys = require('../helpers/keys');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var data = void 0;
var err = void 0;
var payload = void 0;
/* eslint no-underscore-dangle: 0, prefer-destructuring: 0, radix: 0, no-return-assign: 0, no-restricted-globals: 0, max-len: 0, no-multiple-empty-lines: 0 */

var BaseMiddlewareBase = exports.BaseMiddlewareBase = function BaseMiddlewareBase(model) {
  var _this = this;

  _classCallCheck(this, BaseMiddlewareBase);

  this.partyMembersOnly = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(!req.user || req.user.role < 1)) {
                _context.next = 4;
                break;
              }

              err = new Error('Sorry you are not authorized to do this');
              err.status = 401;
              return _context.abrupt('return', next(err));

            case 4:
              next();

            case 5:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }));

    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }();

  this.adminMembersOnly = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(!req.user || req.user.role < 3)) {
                _context2.next = 4;
                break;
              }

              err = new Error('Sorry you are not authorized to do this');
              err.status = 401;
              return _context2.abrupt('return', next(err));

            case 4:
              next();

            case 5:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this);
    }));

    return function (_x4, _x5, _x6) {
      return _ref2.apply(this, arguments);
    };
  }();

  this.revokeAccess = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _this.model.findById(req.params.id);

            case 2:
              data = _context3.sent;

              if (!data) {
                _context3.next = 9;
                break;
              }

              if (!(data.origin.id === req.user.id)) {
                _context3.next = 6;
                break;
              }

              return _context3.abrupt('return', next());

            case 6:
              err = new Error('You are not permitted to do that');
              err.status = 401;
              return _context3.abrupt('return', next(err));

            case 9:
              err = new Error('There is no such resource');
              err.status = 404;
              return _context3.abrupt('return', next(err));

            case 12:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, _this);
    }));

    return function (_x7, _x8, _x9) {
      return _ref3.apply(this, arguments);
    };
  }();

  this.OwnerOrAdminAccess = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res, next) {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return _this.model.findById(req.params.id);

            case 2:
              data = _context4.sent;

              if (!data) {
                _context4.next = 9;
                break;
              }

              if (!(data.origin.id === req.user.id || req.user.role > 3)) {
                _context4.next = 6;
                break;
              }

              return _context4.abrupt('return', next());

            case 6:
              err = new Error('You are not permitted to do that, Sorry');
              err.status = 401;
              return _context4.abrupt('return', next(err));

            case 9:
              err = new Error('There is no such resource');
              err.status = 404;
              return _context4.abrupt('return', next(err));

            case 12:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, _this);
    }));

    return function (_x10, _x11, _x12) {
      return _ref4.apply(this, arguments);
    };
  }();

  this.appendOrigin = function (req, res, next) {
    req.body.origin = req.user;
    next();
  };

  this.appendType = function (req, res, next) {
    req.body.type = req.query.type;
    return next();
  };

  this.appendUser = function (req, res, next) {
    req.body.user = req.user;
    return next();
  };

  this.__ensureUser = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res, next) {
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return _this.__decodeToken(req.headers.authorization);

            case 2:
              payload = _context5.sent;

              req.user = payload;
              req.access = req.headers.authorization;
              next();

            case 6:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, _this);
    }));

    return function (_x13, _x14, _x15) {
      return _ref5.apply(this, arguments);
    };
  }();

  this.__ensureAuthorization = function (req, res, next) {
    if (!req.headers.authorization) {
      err = new Error('Please ensure that there is a user token sent with the request');
      err.status = 400;
      return next(err);
    }
    next();
  };

  this.__checkParams = function (req, res, next) {
    var culprit = void 0;
    Object.entries(req.params).forEach(function (params) {
      if (isNaN(parseInt(params[1]))) {
        return culprit = params[0];
      }
    });
    if (culprit) {
      err = new Error('Please make sure the params are numbers, ' + culprit + ' might be wrong');
      err.status = 400;
      return next(err);
    }
    next();
  };

  this.__checkForNullInput = function (req, res, next) {
    var culprit = void 0;
    Object.entries(req.body).forEach(function (content) {
      if (content[1].length < 1) {
        culprit = content[0];
      }
    });
    if (culprit) {
      err = new Error('Please check that you\'re not sending an empty body, ' + culprit + ' might be wrong');
      err.status = 400;
      return next(err);
    }
    next();
  };

  this.__dispatchError = function (err, req, res, next) {
    var status = err.status ? err.status : 500;
    res.status(status).json({ error: err.message });
  };

  this.__decodeToken = function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(token) {
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return (0, _keys.decodeToken)(token);

            case 2:
              data = _context6.sent;
              return _context6.abrupt('return', data);

            case 4:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, _this);
    }));

    return function (_x16) {
      return _ref6.apply(this, arguments);
    };
  }();

  this.noPermissions = function (message, next) {
    var m = message ? message : 'You do not have permissions to do this';
    err = new Error(m);
    err.status = 401;
    return next(err);
  };

  this.notFound = function (message, next) {
    var m = message ? message : 'We couldnt find any such resource';
    err = new Error(m);
    err.status = 404;
    return next(err);
  };

  this.model = model;
};

var BaseMiddleware = new BaseMiddlewareBase();
exports.default = BaseMiddleware;