'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _post = require('./posts/post');

var _post2 = _interopRequireDefault(_post);

var _events = require('./events/');

var _events2 = _interopRequireDefault(_events);

var _conversations = require('./conversations/');

var _conversations2 = _interopRequireDefault(_conversations);

var _questions = require('./questions/');

var _questions2 = _interopRequireDefault(_questions);

var _donations = require('./donations/');

var _donations2 = _interopRequireDefault(_donations);

var _media = require('./media/');

var _media2 = _interopRequireDefault(_media);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = new _express.Router();

router.use('/posts', _post2.default).use('/events', _events2.default).use('/convos/', _conversations2.default).use('/questions/', _questions2.default).use('/donations/', _donations2.default).use('/media/', _media2.default);

exports.default = router;