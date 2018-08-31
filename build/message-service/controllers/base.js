'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint no-shadow: 0, no-underscore-dangle: 0, radix: 0 */
var data = void 0;

var BaseController = function BaseController(service) {
  var _this = this;

  _classCallCheck(this, BaseController);

  this.__wrapInTryCatch = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(func, next) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return func();

            case 3:
              return _context.abrupt('return', _context.sent);

            case 6:
              _context.prev = 6;
              _context.t0 = _context['catch'](0);

              _context.t0.status = _context.t0.status ? _context.t0.status : 400;
              _context.t0.message = _context.t0.message ? _context.t0.message : 'Something went wrong trying to process this request';
              next(_context.t0);

            case 11:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this, [[0, 6]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  this.__responseOkay = function (res, data) {
    res.status(200).json({ data: data });
  };

  this.__resourceCreated = function (res, data) {
    res.status(201).json({ data: data });
  };

  this.__successfulDelete = function (res) {
    return res.status(204).json({ message: 'Successfully deleted' });
  };

  this.create = function (req, res, next) {
    _this.__wrapInTryCatch(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _this.service.create(req.body, req.headers.authorization);

            case 2:
              data = _context2.sent;

              _this.__resourceCreated(res, data);

            case 4:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this);
    })), next);
  };

  this.fetchOne = function (req, res, next) {
    _this.__wrapInTryCatch(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _this.service.fetchOne('_id', req.params.id);

            case 2:
              data = _context3.sent;

              _this.__responseOkay(res, data);

            case 4:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, _this);
    })), next);
  };

  this.updateOne = function (req, res, next) {
    _this.__wrapInTryCatch(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return _this.service.updateOne('_id', req.params.id, req.body);

            case 2:
              data = _context4.sent;

              _this.__responseOkay(res, data);

            case 4:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, _this);
    })), next);
  };

  this.fetchAll = function (req, res, next) {
    _this.__wrapInTryCatch(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return _this.service.fetchAll();

            case 2:
              data = _context5.sent;

              _this.__responseOkay(res, data);

            case 4:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, _this);
    })), next);
  };

  this.deleteOne = function (req, res, next) {
    _this.__wrapInTryCatch(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return _this.service.deleteOne('_id', req.params.id);

            case 2:
              data = _context6.sent;

              _this.__successfulDelete(res);

            case 4:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, _this);
    })), next);
  };

  this.participate = function (req, res, next) {
    _this.__wrapInTryCatch(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return _this.service.participate('_id', req.params.id, req.user);

            case 2:
              data = _context7.sent;

              _this.__responseOkay(res, data);

            case 4:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, _this);
    })), next);
  };

  this.leave = function (req, res, next) {
    _this.__wrapInTryCatch(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return _this.service.leave('_id', req.params.id, req.user);

            case 2:
              data = _context8.sent;

              _this.__responseOkay(res, data);

            case 4:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, _this);
    })), next);
  };

  this.fetchDataForUser = function (req, res, next) {
    _this.__wrapInTryCatch(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return _this.service.fetchDataForUser(parseInt(req.user.id));

            case 2:
              data = _context9.sent;

              _this.__responseOkay(res, data);

            case 4:
            case 'end':
              return _context9.stop();
          }
        }
      }, _callee9, _this);
    })), next);
  };

  this.service = service;
};

exports.default = BaseController;