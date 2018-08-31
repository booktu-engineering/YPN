'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var questionSchema = new _mongoose2.default.Schema({
  title: {
    type: String,
    trim: true
  },

  questions: {},

  options: {},

  responses: [],

  type: {
    type: Number,
    required: true
  },

  archived: {
    type: Boolean,
    default: false
  },

  meta: {
    type: Object
  }

}, {
  timestamps: true
});

var Question = _mongoose2.default.model('Question', questionSchema);

exports.default = Question;