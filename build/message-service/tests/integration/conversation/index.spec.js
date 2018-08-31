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

var _postService = require('../../../services/post-service');

var _postService2 = _interopRequireDefault(_postService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var res = void 0;
var data = void 0;
var user = void 0;
var source = void 0;
var otherToken = void 0;

describe('Conversation Endpoints', function () {
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
  describe('Normal Conversations - specified with type 0', function () {
    it('Should successfully create a message log between two or more party members', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return (0, _supertest2.default)(_2.default).post('/api/v1/convos/?type=1').send(_helper.validConversation).set('Authorization', _helper2.default);

            case 2:
              res = _context2.sent;

              data = res.body.data;
              (0, _chai.expect)(res.statusCode).to.equal(201);
              (0, _chai.expect)(res.body.data.type).to.equal(1);
              (0, _chai.expect)(res.body.data.members.length).to.not.equal(0);

            case 7:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    })));

    it('Fetch conversation should get some of the messages added to the group', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var group;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              group = _helper.messages.group;

              source = group.map(function (item) {
                return Object.assign({}, item, { destination: data._id });
              });
              _context3.next = 4;
              return _postService2.default.create(source[0]);

            case 4:
              _context3.next = 6;
              return _postService2.default.create(source[1]);

            case 6:
              _context3.next = 8;
              return (0, _supertest2.default)(_2.default).get('/api/v1/convos/' + data._id).set('Authorization', _helper2.default);

            case 8:
              res = _context3.sent;

              (0, _chai.expect)(res.statusCode).to.equal(200);
              (0, _chai.expect)(res.body.data.messages[0]).to.be.an('object');
              (0, _chai.expect)(res.body.data.messages.length).to.not.equal(0);

            case 12:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    })));

    it('Join Conversation should be blocked for non town-hall/debate meetings except invites extended to you', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return _jsonwebtoken2.default.sign({ id: 17, name: 'This is Hasstrup', role: 1 }, _keys.decodeKeyTest);

            case 2:
              otherToken = _context4.sent;
              _context4.next = 5;
              return (0, _supertest2.default)(_2.default).put('/api/v1/convos/join/' + data._id).set('Authorization', otherToken);

            case 5:
              res = _context4.sent;

              (0, _chai.expect)(res.statusCode).to.equal(401);
              (0, _chai.expect)(res.body.error).to.equal('You cannot join a personal conversation, because you havent been invited');

            case 8:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined);
    })));

    it('Invite a member should only work for the owner of the conversation', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return (0, _supertest2.default)(_2.default).put('/api/v1/convos/invite/' + data._id).set('Authorization', _helper2.default).send({ id: 17, username: 'BaysixBitiyong' });

            case 2:
              res = _context5.sent;

              (0, _chai.expect)(res.statusCode).to.equal(200);
              (0, _chai.expect)(res.body.data.invites[0].id).to.equal(17);
              (0, _chai.expect)(res.body.data.invites[0].username).to.equal('BaysixBitiyong');

            case 6:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, undefined);
    })));

    it('The invited member should now be able to join the conversation', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return (0, _supertest2.default)(_2.default).put('/api/v1/convos/join/' + data._id).set('Authorization', otherToken);

            case 2:
              res = _context6.sent;

              (0, _chai.expect)(res.statusCode).to.equal(200);
              (0, _chai.expect)(res.body.data.members.map(function (item) {
                return item.id;
              })).to.include(17);

            case 5:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, undefined);
    })));

    it('Should fetch all the conversations a user is part of', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return (0, _supertest2.default)(_2.default).get('/api/v1/convos/').set('Authorization', _helper2.default);

            case 2:
              res = _context7.sent;

              (0, _chai.expect)(res.statusCode).to.equal(200);
              (0, _chai.expect)(res.body.data).to.be.an('array');
              (0, _chai.expect)(res.body.data[Math.floor(Math.random() * (res.body.data.length - 1))]).to.have.property('members');

            case 6:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, undefined);
    })));

    it('Leave conversation should allow a current member of the conversation leave', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return (0, _supertest2.default)(_2.default).put('/api/v1/convos/leave/' + data._id).set('Authorization', otherToken);

            case 2:
              res = _context8.sent;

              (0, _chai.expect)(res.statusCode).to.equal(200);
              (0, _chai.expect)(res.body.data.members.map(function (item) {
                return item.id;
              })).to.not.include(17);

            case 5:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, undefined);
    })));

    it('Archive conversation should be blocked for personal and group conversation', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return (0, _supertest2.default)(_2.default).delete('/api/v1/convos/' + data.id).set('Authorization', _helper2.default);

            case 2:
              res = _context9.sent;

              (0, _chai.expect)(res.statusCode).to.equal(401);
              (0, _chai.expect)(res.body.error).to.equal('Sorry you are not authorized to do this');

            case 5:
            case 'end':
              return _context9.stop();
          }
        }
      }, _callee9, undefined);
    })));
  });
  describe('Town Hall Special Filters', function () {
    it('Should reject an an invalid post because it is a basic user', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return (0, _supertest2.default)(_2.default).post('/api/v1/convos/?type=3').send(_helper.invalidTownHall).set('Authorization', _helper2.default);

            case 2:
              res = _context10.sent;

              (0, _chai.expect)(res.statusCode).to.equal(401);

            case 4:
            case 'end':
              return _context10.stop();
          }
        }
      }, _callee10, undefined);
    })));

    it('Should reject the create request because the body is incomplete', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
      return regeneratorRuntime.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return _jsonwebtoken2.default.sign({ id: 3, role: 5, username: 'Hasstrupezekiel' }, _keys.decodeKeyTest);

            case 2:
              otherToken = _context11.sent;
              _context11.next = 5;
              return (0, _supertest2.default)(_2.default).post('/api/v1/convos/?type=3').set('Authorization', otherToken);

            case 5:
              res = _context11.sent;

              (0, _chai.expect)(res.statusCode).to.equal(422);

            case 7:
            case 'end':
              return _context11.stop();
          }
        }
      }, _callee11, undefined);
    })));

    it('Should create a successful townhall with the focus', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
      return regeneratorRuntime.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _context12.next = 2;
              return (0, _supertest2.default)(_2.default).post('/api/v1/convos/?type=3').set('Authorization', otherToken).send(_helper.validTownHall);

            case 2:
              res = _context12.sent;

              (0, _chai.expect)(res.statusCode).to.equal(201);
              (0, _chai.expect)(res.body.data.focus.id).to.equal(_helper.validTownHall.focus.id);

            case 5:
            case 'end':
              return _context12.stop();
          }
        }
      }, _callee12, undefined);
    })));
  });
});