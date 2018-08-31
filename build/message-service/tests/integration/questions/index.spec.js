'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

require('babel-polyfill');

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

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
var data = void 0;
var validToken = void 0;

describe('Questions EndPoints', function () {

  before(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _jsonwebtoken2.default.sign({ id: 2, role: 5, name: 'Hasstrup Ezekiel' }, _keys.decodeKeyTest);

          case 2:
            validToken = _context.sent;

          case 3:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  })));
  describe('Polls Endpoints', function () {
    it('Should create a a poll with admin access only', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return (0, _supertest2.default)(_2.default).post('/api/v1/questions/?type=1').set('Authorization', validToken).send(_helper.validPoll);

            case 2:
              res = _context2.sent;

              data = res.body.data;
              (0, _chai.expect)(res.statusCode).to.equal(201);
              (0, _chai.expect)(res.body.data.meta.type).to.equal('Opinion');
              (0, _chai.expect)(res.body.data.type).to.equal(1);

            case 7:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    })));

    it('Should respond to a valid question', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return (0, _supertest2.default)(_2.default).put('/api/v1/questions/respond').send({ id: data._id, responses: [{ 0: 'Business' }] }).set('Authorization', _helper2.default);

            case 2:
              res = _context3.sent;

              (0, _chai.expect)(res.statusCode).to.equal(200);
              (0, _chai.expect)(res.body.data.options['0'].Business).to.equal(1);

            case 5:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    })));

    it('Fetch results should fetch the results of a poll', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return (0, _supertest2.default)(_2.default).get('/api/v1/questions/results/' + data._id).set('Authorization', _helper2.default);

            case 2:
              res = _context4.sent;

              (0, _chai.expect)(res.statusCode).to.equal(200);
              (0, _chai.expect)(res.body.data['0'].answers.Business).to.equal(1);

            case 5:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined);
    })));

    it('Archiving a post should archive this subject poll', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return (0, _supertest2.default)(_2.default).delete('/api/v1/questions/' + data._id).set('Authorization', validToken);

            case 2:
              res = _context5.sent;

              (0, _chai.expect)(res.statusCode).to.equal(200);
              (0, _chai.expect)(res.body.data.archived).to.equal(true);

            case 5:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, undefined);
    })));
  });

  describe('Election Testing Endpoints', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:

            it('Should create a a poll with admin access only', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
              return regeneratorRuntime.wrap(function _callee6$(_context6) {
                while (1) {
                  switch (_context6.prev = _context6.next) {
                    case 0:
                      _context6.next = 2;
                      return (0, _supertest2.default)(_2.default).post('/api/v1/questions/?type=2').set('Authorization', validToken).send(_helper.validElection);

                    case 2:
                      res = _context6.sent;

                      data = res.body.data;
                      (0, _chai.expect)(res.statusCode).to.equal(201);
                      (0, _chai.expect)(res.body.data.meta.type).to.equal('Party');
                      (0, _chai.expect)(res.body.data.type).to.equal(2);

                    case 7:
                    case 'end':
                      return _context6.stop();
                  }
                }
              }, _callee6, undefined);
            })));

            it('Should respond to the user', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
              return regeneratorRuntime.wrap(function _callee7$(_context7) {
                while (1) {
                  switch (_context7.prev = _context7.next) {
                    case 0:
                      _context7.next = 2;
                      return (0, _supertest2.default)(_2.default).put('/api/v1/questions/respond').set('Authorization', _helper2.default).send(_extends({ id: data._id }, _helper.ElectionResponse1));

                    case 2:
                      res = _context7.sent;

                      (0, _chai.expect)(res.statusCode).to.equal(200);
                      (0, _chai.expect)(res.body.data.responses.length).to.not.equal(0);

                    case 5:
                    case 'end':
                      return _context7.stop();
                  }
                }
              }, _callee7, undefined);
            })));

            it('Should respond to the user', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
              return regeneratorRuntime.wrap(function _callee8$(_context8) {
                while (1) {
                  switch (_context8.prev = _context8.next) {
                    case 0:
                      _context8.next = 2;
                      return (0, _supertest2.default)(_2.default).put('/api/v1/questions/respond').set('Authorization', validToken).send(_extends({ id: data._id }, _helper.ElectionResponse2));

                    case 2:
                      res = _context8.sent;

                      (0, _chai.expect)(res.statusCode).to.equal(200);
                      (0, _chai.expect)(res.body.data.responses.length).to.not.equal(1);

                    case 5:
                    case 'end':
                      return _context8.stop();
                  }
                }
              }, _callee8, undefined);
            })));

            it('Fetch results of an election should show the results of an election', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
              return regeneratorRuntime.wrap(function _callee9$(_context9) {
                while (1) {
                  switch (_context9.prev = _context9.next) {
                    case 0:
                      _context9.next = 2;
                      return (0, _supertest2.default)(_2.default).get('/api/v1/questions/results/' + data._id).set('Authorization', _helper2.default);

                    case 2:
                      res = _context9.sent;

                      (0, _chai.expect)(res.statusCode).to.equal(200);
                      (0, _chai.expect)(res.body.data['0'].response.length).to.not.equal(1);

                    case 5:
                    case 'end':
                      return _context9.stop();
                  }
                }
              }, _callee9, undefined);
            })));

          case 4:
          case 'end':
            return _context10.stop();
        }
      }
    }, _callee10, undefined);
  })));
});