'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint func-names: 0, radix: 0 */
var donationSchema = new _mongoose2.default.Schema({
  target: {
    type: Number
  },

  startDate: {
    type: Date
  },

  endDate: {
    type: Date
  },

  description: {
    type: String,
    required: true
  },

  amount: {
    type: Number,
    default: 0
  },

  title: {
    type: String,
    trim: true,
    required: true
  },

  type: {
    type: Number,
    required: true
  },

  origin: {},

  valid: {
    type: Boolean,
    default: false
  },

  archived: {
    type: Boolean,
    default: false
  },

  meta: {
    type: Object
  },

  references: []
});

donationSchema.methods.getStatus = function () {
  var percentage = parseInt(this.amount) / parseInt(this.target) * 100;
  return { percentage: Math.floor(percentage), donors: this.references.length };
};

var Donation = _mongoose2.default.model('Donation', donationSchema);
exports.default = Donation;