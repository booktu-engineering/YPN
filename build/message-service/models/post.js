'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var postSchema = new _mongoose2.default.Schema({
  content: {
    type: String,
    required: true,
    trim: true
  },

  origin: {
    type: Object,
    required: true
  },

  destination: {
    type: _mongoose2.default.Schema.Types.ObjectId,
    default: null
  },

  likes: {
    type: Object,
    default: { count: 0, data: [] }
  },

  commentCount: {
    type: Number,
    default: 0
  },

  referenceObject: {
    type: Object,
    default: null
  },

  referenceID: {
    type: _mongoose2.default.Schema.Types.ObjectId,
    default: null
  },

  type: {
    type: Number,
    required: true
  },

  media: [],

  links: []
}, {
  timestamps: true
});

var Post = _mongoose2.default.model('Post', postSchema);

exports.default = Post;