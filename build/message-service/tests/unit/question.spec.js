'use strict';

var _chai = require('chai');

var _test = require('./test');

var _election = require('../../services/election');

var _election2 = _interopRequireDefault(_election);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var data = void 0;
var results = void 0;
var responses = void 0;
/* eslint object-curly-newline: 0 */
describe('Question Service - Polls, Surveys, Questionaiires and elections', function () {
  describe('Polls unit tests', function () {
    it('Create should automatically create a unit with type 3', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              data = { title: 'A test poll', type: 2, questions: [{ question: 'Who would you rather go for ?', options: ['Free Education', 'Goodlucj Jonathan', 'Princess Diana'] }], meta: { type: 'Opinion' } };
              _context.next = 3;
              return _election2.default.createSync(data);

            case 3:
              data = _context.sent;

              (0, _chai.expect)(data.type).to.equal(2);
              (0, _chai.expect)(data.questions['0']).to.equal('Who would you rather go for ?');
              (0, _chai.expect)(data.options['0']['Free Education']).to.equal(0);

            case 7:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    })));

    it('Respond should vote for a specfic option', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              data = { id: data.id, responses: [{ 0: 'Free Education' }], user: { name: 'Hasstrup Ezekiel', id: 2 }, reasons: { 0: 'I think free education is totally nice' } };
              _context2.next = 3;
              return _election2.default.respond(data);

            case 3:
              data = _context2.sent;

              (0, _chai.expect)(data.options['0']['Free Education']).to.equal(1);
              (0, _chai.expect)(data.responses[0].user.name).to.equal('Hasstrup Ezekiel');

            case 6:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    })));

    it('Respond should vote for a specfic option (Second vote)', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              data = { id: data.id, responses: [{ 0: 'Princess Diana' }], user: { name: 'Chisom Ekwuribe', id: 2 }, reasons: { 0: 'She was truly amazing' } };
              _context3.next = 3;
              return _election2.default.respond(data);

            case 3:
              data = _context3.sent;

              (0, _chai.expect)(data.options['0']['Princess Diana']).to.equal(1);
              (0, _chai.expect)(data.responses[1].user.name).to.equal('Chisom Ekwuribe');

            case 6:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    })));

    it('Fetch Results should get the results of the subject election', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return _election2.default.fetchResults('_id', data._id);

            case 2:
              results = _context4.sent;

              (0, _chai.expect)(results).to.be.an('object');
              (0, _chai.expect)(results['0'].question).to.equal('Who would you rather go for ?');

            case 5:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined);
    })));
  });

  describe('Elections service object', function () {
    before(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return _election2.default.createSync(_test.testSurvey);

            case 2:
              data = _context5.sent;

              responses = _test.voteResponses.map(function (vote) {
                return Object.assign({}, vote, { id: data._id });
              });
              _context5.next = 6;
              return _election2.default.respond(responses[0]);

            case 6:
              _context5.next = 8;
              return _election2.default.respond(responses[1]);

            case 8:
              _context5.next = 10;
              return _election2.default.respond(responses[2]);

            case 10:
              _context5.next = 12;
              return _election2.default.respond(responses[3]);

            case 12:
              _context5.next = 14;
              return _election2.default.respond(responses[4]);

            case 14:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, undefined);
    })));

    it('Fetch results of the election', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return _election2.default.fetchResults('_id', data._id);

            case 2:
              results = _context6.sent;

              (0, _chai.expect)(results[0].response).to.be.an('array');
              (0, _chai.expect)(results[0].response[0].user.name).to.equal('Jermaine cole');
              (0, _chai.expect)(results[0].response[0].reason).to.equal('well I really love sleeping');

            case 6:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, undefined);
    })));
  });
});