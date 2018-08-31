'use strict';

var _chai = require('chai');

var _donation = require('../../services/donation');

var _donation2 = _interopRequireDefault(_donation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var data = void 0;
var mock = void 0;

/* eslint object-curly-newline: 0*/
describe('Donation Service', function () {
  before(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            mock = {
              target: 300000,
              startDate: Date.now(),
              endDate: Date.now(),
              description: 'This is the beginning of donation',
              title: 'Donation for Campaign',
              origin: {
                name: 'Hasstrup Ezekiel',
                role: 2,
                avatar: 'String',
                id: 1
              },
              type: 3
            };
            _context.next = 3;
            return _donation2.default.create(mock);

          case 3:
            data = _context.sent;

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  })));

  it('Donation should add the donation to the current campaign', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            mock = { id: data.id, amount: 10000, referenceID: '1233000', date: Date.now(), user: { name: 'Chisom Ekwuribe', id: 2 } };
            _context2.next = 3;
            return _donation2.default.donate(mock);

          case 3:
            data = _context2.sent;

            (0, _chai.expect)(data.amount).to.equal(10000);
            (0, _chai.expect)(data.references.length).to.equal(1);
            (0, _chai.expect)(data.references[0].user.name).to.equal('Chisom Ekwuribe');

          case 7:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  })));

  it('Fetch one should return the status of the current donation', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _donation2.default.fetchOneSync('_id', data._id);

          case 2:
            data = _context3.sent;

            (0, _chai.expect)(data.status).to.exist;
            (0, _chai.expect)(data.status.donors).to.equal(1);

          case 5:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  })));
});