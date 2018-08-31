'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _post = require('./post');

var _post2 = _interopRequireDefault(_post);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/* eslint func-names: 0 */
var conversationSchema = new _mongoose2.default.Schema({
  members: {
    type: [],
    required: true
  },

  type: { type: Number },

  topic: { type: String, default: null, trim: true },

  startDate: {
    type: Date,
    trim: true
  },

  endDate: {
    type: Date,
    trim: true
  },

  focus: {
    type: Object
  },

  details: {
    type: Object
  },

  archived: {
    type: Boolean,
    default: false
  },

  invites: [],

  origin: {
    type: Object
  }
}, {
  timestamps: true
});

conversationSchema.methods.getMessages = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  var posts;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _post2.default.find({ destination: this._id });

        case 2:
          posts = _context.sent;
          return _context.abrupt('return', posts);

        case 4:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, this);
}));

var Conversation = _mongoose2.default.model('Conversation', conversationSchema);
exports.default = Conversation;