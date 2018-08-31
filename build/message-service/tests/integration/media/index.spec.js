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
var otherData = void 0;
var data = void 0;
var otherToken = void 0;

describe('Media Enpoints', function () {
  before(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _jsonwebtoken2.default.sign({ role: 5, id: 12, name: 'Baysix' }, _keys.decodeKeyTest);

          case 2:
            otherToken = _context.sent;

          case 3:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  })));

  it('Should successfuly create a gallery', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _supertest2.default)(_2.default).post('/api/v1/media/').send(_helper.validMedia).set('Authorization', otherToken);

          case 2:
            res = _context2.sent;

            data = res.body.data;
            (0, _chai.expect)(res.statusCode).to.equal(201);
            (0, _chai.expect)(res.body.data).to.be.an('object');
            (0, _chai.expect)(res.body.data).to.have.property('title');

          case 7:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  })));

  it('Should get all the galleries', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _supertest2.default)(_2.default).get('/api/v1/media/').set('Authorization', _helper2.default);

          case 2:
            res = _context3.sent;

            (0, _chai.expect)(res.statusCode).to.equal(200);
            (0, _chai.expect)(res.body.data).to.be.an('array');
            (0, _chai.expect)(res.body.data[0]).to.have.property('title');

          case 6:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  })));

  it('Should fetch a specific gallery', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return (0, _supertest2.default)(_2.default).get('/api/v1/media/' + data._id).set('Authorization', _helper2.default);

          case 2:
            res = _context4.sent;

            (0, _chai.expect)(res.statusCode).to.equal(200);
            (0, _chai.expect)(res.body.data).to.be.an('object');
            (0, _chai.expect)(res.body.data._id).to.have.equal(data._id);

          case 6:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  })));

  it('Should edit a specific gallery', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return (0, _supertest2.default)(_2.default).put('/api/v1/media/' + data._id).set('Authorization', otherToken).send({ title: 'Changed it' });

          case 2:
            res = _context5.sent;

            (0, _chai.expect)(res.statusCode).to.equal(200);
            (0, _chai.expect)(res.body.data.title).to.equal('Changed it');

          case 5:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  })));

  it('Should delete a specific gallery', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return (0, _supertest2.default)(_2.default).delete('/api/v1/media/' + data._id).set('Authorization', otherToken);

          case 2:
            res = _context6.sent;

            (0, _chai.expect)(res.statusCode).to.equal(204);

          case 4:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  })));
});