'use strict';

require('babel-polyfill');

var _chai = require('chai');

var _conversationService = require('../../services/conversation-service');

var _conversationService2 = _interopRequireDefault(_conversationService);

var _postService = require('../../services/post-service');

var _postService2 = _interopRequireDefault(_postService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var testcase = void 0;
var data = void 0;

/* eslint object-curly-newline: 0, padded-blocks: 0 */
describe('Conversation service object', function () {

  it('Create should create a conversation', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            testcase = { members: [{ id: 69, email: 'hasstrup.ezekiel@gmail.com', username: 'HasstrupTheBigMan' }, { id: 70, email: 'Hellopaperstack@gmail.com', username: 'Paperstack' }], type: 1, origin: { id: 1 } };
            _context.next = 3;
            return _conversationService2.default.create(testcase);

          case 3:
            data = _context.sent;

            (0, _chai.expect)(data.members.length).to.equal(2);

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  })));

  describe('Fetch messages for conversation', function () {
    before(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var message1, message2;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              message1 = { content: 'This is the crazy', type: 2, destination: data._id, origin: { id: 70, name: 'Hasstrup Ezekiel', username: 'Paperstack' } };
              message2 = { content: 'This is the crazy again', type: 2, destination: data._id, origin: { id: 69, name: 'Toyin Ezekiel', username: 'Hasstrupezekiel' } };
              _context2.next = 4;
              return _postService2.default.create(message1);

            case 4:
              _context2.next = 6;
              return _postService2.default.create(message2);

            case 6:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    })));

    it('Fetch one should get the conversation and its messages', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _conversationService2.default.fetchOne('_id', data._id);

            case 2:
              data = _context3.sent;

              (0, _chai.expect)(data.messages).to.be.an('array');
              (0, _chai.expect)(data.messages[0].content).to.equal('This is the crazy');

            case 5:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    })));

    it('Should add a user to the members of a conversation', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return _conversationService2.default.extendInvite('_id', data._id, { id: 12, username: 'BaysixBitiyong' });

            case 2:
              data = _context4.sent;

              (0, _chai.expect)(data.invites.map(function (item) {
                return item.id;
              })).to.include(12);
              (0, _chai.expect)(data.invites[0].username).to.equal('BaysixBitiyong');

            case 5:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined);
    })));
  });

  describe('Get timeline', function () {
    before(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
      var post1, post2, post3;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              post1 = { content: 'This is the crazy ghost', type: 1, destination: null, origin: { id: 14, name: 'Hasstrup Ezekiel' } };
              post2 = { content: 'This is the crazy ghost 122', type: 1, destination: null, origin: { id: 14, name: 'Hasstrup Ezekiel' } };
              post3 = { content: 'This is the crazy ghost 12345', type: 1, destination: null, origin: { id: 15, name: 'Ezekiel Hasstrup G' } };
              _context5.next = 5;
              return _postService2.default.create(post1);

            case 5:
              _context5.next = 7;
              return _postService2.default.create(post2);

            case 7:
              _context5.next = 9;
              return _postService2.default.create(post3);

            case 9:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, undefined);
    })));

    it('Get timeline should get the posts of a user', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
      var body;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              body = [14, 15];
              _context6.next = 3;
              return _conversationService2.default.getTimeline(body);

            case 3:
              data = _context6.sent;

              (0, _chai.expect)(data).to.be.an('array');

            case 5:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, undefined);
    })));
  });
});