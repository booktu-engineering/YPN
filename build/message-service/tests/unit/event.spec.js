'use strict';

var _chai = require('chai');

var _event = require('../../services/event');

var _event2 = _interopRequireDefault(_event);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var data = void 0;
var source = void 0;
/* eslint object-curly-newline: 0, no-unused-expressions: 0 */
describe('Event service', function () {
  it('Create service should create an event', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            data = { origin: { id: 2, name: 'Hasstrup' }, startDate: Date.now(), endDate: Date.now(), name: 'Party Meeting', details: { location: 'Surulere Lagos', max: 100 } };
            _context.next = 3;
            return _event2.default.create(data);

          case 3:
            data = _context.sent;

            (0, _chai.expect)(data.name).to.equal('Party Meeting');

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  })));

  it('Join Event should add a user to the members of a group', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _event2.default.participate('_id', data._id, { id: 12 });

          case 2:
            data = _context2.sent;

            (0, _chai.expect)(data).to.exist;
            data.members = data.members.map(function (item) {
              return item.id;
            });
            (0, _chai.expect)(data.members).to.include(12);

          case 6:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  })));

  it('Fetch Events For User should fetch all the events a user is a part of', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _event2.default.fetchEventsForUser(12);

          case 2:
            source = _context3.sent;

            (0, _chai.expect)(source).to.be.an('array');
            (0, _chai.expect)(source.length).to.not.equal(0);

          case 5:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  })));

  it('Leave Event should remove a user from the group', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _event2.default.leave('_id', data._id, { id: 12 });

          case 2:
            data = _context4.sent;

            (0, _chai.expect)(data).to.exist;
            data.members = data.members.map(function (item) {
              return item.id;
            });
            (0, _chai.expect)(data.members).to.not.include(12);

          case 6:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  })));
});