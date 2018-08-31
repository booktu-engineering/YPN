'use strict';

require('babel-polyfill');

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _chai = require('chai');

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _ = require('../../../');

var _2 = _interopRequireDefault(_);

var _helper = require('../helper');

var _helper2 = _interopRequireDefault(_helper);

var _keys = require('../../../helpers/keys');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var res = void 0;
var user = void 0;
var data = void 0;

/* eslint prefer-destructuring: 0, no-unused-expressions: 0 */
describe('Events Endpoints', function () {
  before(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _keys.decodeToken)(_helper2.default);

          case 2:
            user = _context.sent;

          case 3:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  })));

  it('Post events/ should create a new event', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _supertest2.default)(_2.default).post('/api/v1/events').send(_helper.validEvent).set('Authorization', _helper2.default);

          case 2:
            res = _context2.sent;

            data = res.body.data;
            (0, _chai.expect)(res.statusCode).to.equal(201);
            (0, _chai.expect)(res.body.data.name).to.equal(_helper.validEvent.name);

          case 6:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  })));

  it('Get events should fetch all the events on the platform', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _supertest2.default)(_2.default).get('/api/v1/events').set('Authorization', _helper2.default);

          case 2:
            res = _context3.sent;

            (0, _chai.expect)(res.statusCode).to.equal(200);
            (0, _chai.expect)(res.body.data).to.be.an('array');
            res.body.data = res.body.data.filter(function (item) {
              return !item.valid;
            });
            (0, _chai.expect)(res.body.data.length).to.equal(0);

          case 7:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  })));

  it('Get event should fetch a particular event', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return (0, _supertest2.default)(_2.default).get('/api/v1/events/' + data._id).set('Authorization', _helper2.default);

          case 2:
            res = _context4.sent;

            (0, _chai.expect)(res.statusCode).to.equal(200);
            (0, _chai.expect)(res.body.data).to.be.an('object');
            (0, _chai.expect)(res.body.data.name).to.equal(_helper.validEvent.name);

          case 6:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  })));

  it('Confirm event should confirm the event from the backend', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
    var adminToken;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _jsonwebtoken2.default.sign({ role: 5, id: 114 }, _keys.decodeKeyTest);

          case 2:
            adminToken = _context5.sent;
            _context5.next = 5;
            return (0, _supertest2.default)(_2.default).put('/api/v1/events/confirm/' + data._id).set('Authorization', adminToken);

          case 5:
            res = _context5.sent;

            (0, _chai.expect)(res.statusCode).to.equal(200);
            (0, _chai.expect)(res.body.data.valid).to.be.true;

          case 8:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  })));

  it('Get events should fetch all the events on the platform, after confirmation', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return (0, _supertest2.default)(_2.default).get('/api/v1/events').set('Authorization', _helper2.default);

          case 2:
            res = _context6.sent;

            (0, _chai.expect)(res.statusCode).to.equal(200);
            (0, _chai.expect)(res.body.data).to.be.an('array');
            (0, _chai.expect)(res.body.data.length).to.not.equal(0);

          case 6:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  })));

  it('Attend event should let a user attend a user', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return (0, _supertest2.default)(_2.default).put('/api/v1/events/join/' + data._id).set('Authorization', _helper2.default);

          case 2:
            res = _context7.sent;

            (0, _chai.expect)(res.statusCode).to.equal(200);
            (0, _chai.expect)(res.body.data).to.be.an('object');
            (0, _chai.expect)(res.body.data.members.length).not.to.equal(0);
            (0, _chai.expect)(res.body.data.members[0].id).to.equal(user.id);

          case 7:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined);
  })));

  it('Get All the events concerning a user', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return (0, _supertest2.default)(_2.default).get('/api/v1/events/user/' + user.id).set('Authorization', _helper2.default);

          case 2:
            res = _context8.sent;

            (0, _chai.expect)(res.statusCode).to.equal(200);
            (0, _chai.expect)(res.body.data).to.be.an('array');
            (0, _chai.expect)(res.body.data.length).to.not.equal(0);

          case 6:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, undefined);
  })));

  it('Leave event should remove a user from an event', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return (0, _supertest2.default)(_2.default).put('/api/v1/events/leave/' + data._id).set('Authorization', _helper2.default);

          case 2:
            res = _context9.sent;

            (0, _chai.expect)(res.statusCode).to.equal(200);
            (0, _chai.expect)(res.body.data.members.map(function (item) {
              return item.id;
            })).not.to.include(user.id);

          case 5:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, undefined);
  })));

  it('Should edit event || ONLY the creator of the event can do this', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return (0, _supertest2.default)(_2.default).put('/api/v1/events/' + data._id).set('Authorization', _helper2.default).send({ name: 'Grand Party Alliance' });

          case 2:
            res = _context10.sent;

            (0, _chai.expect)(res.statusCode).to.equal(200);
            (0, _chai.expect)(res.body.data.name).to.equal('Grand Party Alliance');

          case 5:
          case 'end':
            return _context10.stop();
        }
      }
    }, _callee10, undefined);
  })));

  it('Should archive an event after it has been done', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return (0, _supertest2.default)(_2.default).delete('/api/v1/events/' + data._id).set('Authorization', _helper2.default);

          case 2:
            res = _context11.sent;

            (0, _chai.expect)(res.statusCode).to.equal(200);
            (0, _chai.expect)(res.body.data.archived).to.equal(true);

          case 5:
          case 'end':
            return _context11.stop();
        }
      }
    }, _callee11, undefined);
  })));
});