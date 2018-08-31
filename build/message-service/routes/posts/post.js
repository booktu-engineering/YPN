'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _posts = require('../../middlewares/posts');

var _posts2 = _interopRequireDefault(_posts);

var _posts3 = require('../../controllers/posts');

var _posts4 = _interopRequireDefault(_posts3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
/* eslint max-len: 0, no-underscore-dangle: 0 */

// This should return the timeline of a user
router.get('/', _posts2.default.__ensureAuthorization, _posts2.default.__ensureUser, _posts4.default.getTimeline, _posts2.default.__dispatchError);

// should enable only party members create post
router.post('/', _posts2.default.__ensureAuthorization, _posts2.default.__ensureUser, _posts2.default.partyMembersOnly, _posts2.default.__checkForNullInput, _posts2.default.appendOrigin, _posts4.default.create, _posts2.default.__dispatchError);

// should everyone get a single post PS: remember to write another that allows users do some cool things
router.get('/:id', _posts4.default.fetchOne, _posts2.default.__dispatchError);

// should edit the post
router.put('/:id', _posts2.default.__ensureAuthorization, _posts2.default.__ensureUser, _posts2.default.revokeAccess, _posts2.default.__checkForNullInput, _posts2.default.contentOnlyEditable, _posts4.default.updateOne, _posts2.default.__dispatchError);

// should delete the post
router.delete('/:id', _posts2.default.__ensureAuthorization, _posts2.default.__ensureUser, _posts2.default.revokeAccess, _posts4.default.deleteOne, _posts2.default.__dispatchError);

router.put('/like/:id', _posts2.default.__ensureAuthorization, _posts2.default.__ensureUser, _posts4.default.like, _posts2.default.__dispatchError);

// do something here.
router.get('/all/:id', _posts2.default.__ensureAuthorization, _posts2.default.__ensureUser, _posts4.default.fetchAllPosts, _posts2.default.__dispatchError);
exports.default = router;