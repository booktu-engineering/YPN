'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var eventSchema = new _mongoose2.default.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },

  startDate: {
    type: Date,
    required: true,
    trim: true
  },

  endDate: {
    type: Date,
    required: true,
    trim: true
  },

  members: {
    type: []
  },

  details: {
    type: Object,
    default: {},
    required: true
  },

  valid: {
    type: Boolean,
    default: false
  },

  origin: {
    type: Object,
    required: true
  },
  archived: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

var Event = _mongoose2.default.model('Event', eventSchema);

exports.default = Event;