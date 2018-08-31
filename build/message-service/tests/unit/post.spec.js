'use strict';

require('babel-polyfill');

var _chai = require('chai');

var _postService = require('../../services/post-service');

var _postService2 = _interopRequireDefault(_postService);

var _helper = require('../integration/helper');

var _helper2 = _interopRequireDefault(_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var data = void 0;
var mock = void 0;
var status = void 0;
/* eslint object-curly-newline: 0, no-unused-expressions: 0, prefer-destructuring: 0 */
describe('Post Services', function () {
  it('Create should create a new post', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            mock = { content: 'This is a test content', origin: { id: 1880, email: 'hasstrup.ezekiel@gmail.com', username: 'HasstrupEzejiek', nt_token: _helper.nt_token }, type: 2, destination: null };
            _context.next = 3;
            return _postService2.default.create(mock, _helper2.default);

          case 3:
            mock = _context.sent;

            (0, _chai.expect)(mock.origin.id).to.equal(1880);

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  })));

  it('Fetch one should get the post queried for', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _postService2.default.fetchOne('content', 'This is a test content');

          case 2:
            data = _context2.sent;

            (0, _chai.expect)(data).to.exist;
            (0, _chai.expect)(data.origin.id).to.equal(1880);

          case 5:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  })));

  it('Fetch All should get all the posts queried for', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _postService2.default.fetchAll();

          case 2:
            data = _context3.sent;

            (0, _chai.expect)(data).to.exist;
            (0, _chai.expect)(data).to.be.an('array');

          case 5:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  })));

  it('Update one should only update the content of the db', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            data = data[0];
            _context4.next = 3;
            return _postService2.default.updateOne('_id', data.id, { content: 'I have now changed the content of the post', id: 4 });

          case 3:
            data = _context4.sent;

            (0, _chai.expect)(data.content).to.equal('I have now changed the content of the post');
            (0, _chai.expect)(data).to.exist;

          case 6:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  })));

  it('Liking a post should allow a user like a post', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _postService2.default.like('_id', mock._id, { id: 7, name: 'Onosetale32', avatar: 'blam', username: 'Baysixagain', email: 'hasstrup.ezekiel@gmail.com', nt_token: _helper.nt_token }, 0);

          case 2:
            data = _context5.sent;

            (0, _chai.expect)(data.likes.count).to.equal(1);
            (0, _chai.expect)(data.likes.data[0].id).to.equal(7);

          case 5:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  })));

  it('Unliking a post should let a user unlike a post', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _postService2.default.like('_id', mock._id, { id: 7, name: 'Onosetale32', avatar: 'blam', username: 'Baysix', email: 'hasstrup.ezekiel@gmail.com', nt_token: _helper.nt_token }, 1);

          case 2:
            data = _context6.sent;

            (0, _chai.expect)(data.likes.count).to.equal(0);
            (0, _chai.expect)(data.likes.data.length).to.equal(0);

          case 5:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  })));

  it('Fetching the comments of a post', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
    var otherData, comments;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _postService2.default.create({ content: 'This is a another test content', origin: { id: 19, username: 'Baysix-biti', nt_token: _helper.nt_token }, type: 2, destination: null, referenceID: data._id, referenceObject: data });

          case 2:
            otherData = _context7.sent;
            _context7.next = 5;
            return _postService2.default.fetchComments(data);

          case 5:
            comments = _context7.sent;

            (0, _chai.expect)(comments).to.be.an('array');
            (0, _chai.expect)(comments[0].origin.id).to.equal(19);

          case 8:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined);
  })));

  it('Delete one should delete the message', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return _postService2.default.deleteOne('_id', data.id);

          case 2:
            status = _context8.sent;

            (0, _chai.expect)(status).to.be.true;

          case 4:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, undefined);
  })));

  it('Should examine for mentions should return the users mentioned in a comment', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return _postService2.default.__examineForMentions({ content: 'Hasstrup is a pretty great guy @Hasstrupezekiel @Edgar Bahringer', _id: data._id, origin: { name: 'Hasstrup Ezekiel', username: 'BaysixBiti' } }, _helper2.default);

          case 2:
            data = _context9.sent;

          case 3:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, undefined);
  })));
});