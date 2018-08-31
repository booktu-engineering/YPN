'use strict';

require('babel-polyfill');

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _chai = require('chai');

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
/* eslint no-unused-expressions: 0, prefer-destructuring: 0 */
describe('Post EndPoints', function () {
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

  it('Create one should create a post with origin belonging to the current user', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return (0, _supertest2.default)(_2.default).post('/api/v1/posts/').send(_helper.validPost).set('Authorization', _helper2.default);

          case 3:
            res = _context2.sent;

            (0, _chai.expect)(res.statusCode).to.equal(201);
            (0, _chai.expect)(res.body.data.origin.username).to.equal(user.username);
            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2['catch'](0);

            (0, _chai.expect)(_context2.t0).to.not.exist;

          case 11:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 8]]);
  })));

  it('Fetch one should fetch a particular post', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            data = res.body.data;
            _context3.next = 3;
            return (0, _supertest2.default)(_2.default).get('/api/v1/posts/' + data._id);

          case 3:
            res = _context3.sent;

            (0, _chai.expect)(res.statusCode).to.equal(200);
            (0, _chai.expect)(res.body.data.data).to.be.an('object');
            (0, _chai.expect)(res.body.data.data).to.have.property('origin');

          case 7:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  })));

  it('/ should get the timeline of the current user', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return (0, _supertest2.default)(_2.default).get('/api/v1/posts/').set('Authorization', _helper2.default);

          case 2:
            res = _context4.sent;

            (0, _chai.expect)(res.statusCode).to.equal(200);
            (0, _chai.expect)(res.body.data).to.be.an('array');

          case 5:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  })));

  it('Should update the post object if the user owns the object', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return (0, _supertest2.default)(_2.default).put('/api/v1/posts/' + data._id).send({ content: 'I changed the content to something amazing', media: 'Blah Blah' }).set('Authorization', _helper2.default);

          case 2:
            res = _context5.sent;

            (0, _chai.expect)(res.statusCode).to.equal(200);
            (0, _chai.expect)(res.body.data).to.be.an('object');
            (0, _chai.expect)(res.body.data.content).to.equal('I changed the content to something amazing');
            (0, _chai.expect)(res.body.data.media).to.not.equal('Blah Blah');

          case 7:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  })));

  it('Delete one should delete a specific post with the right access', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return (0, _supertest2.default)(_2.default).delete('/api/v1/posts/' + data._id).set('Authorization', _helper2.default);

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