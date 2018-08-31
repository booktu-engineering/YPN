'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mediaSchema = new _mongoose2.default.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  images: {
    type: Array,
    default: [],
    trim: true
  },
  origin: {}
}, {
  timestamps: true
});

var Media = _mongoose2.default.model('Media', mediaSchema);

exports.default = Media;