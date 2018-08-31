'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _media = require('../../controllers/media/');

var _media2 = _interopRequireDefault(_media);

var _media3 = require('../../middlewares/media/');

var _media4 = _interopRequireDefault(_media3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();

router.get('/', _media4.default.__ensureAuthorization, _media4.default.__ensureUser, _media2.default.fetchAll, _media4.default.__dispatchError).get('/:id', _media4.default.__ensureAuthorization, _media4.default.__ensureUser, _media2.default.fetchOne, _media4.default.__dispatchError).post('/', _media4.default.__ensureAuthorization, _media4.default.__ensureUser, _media4.default.adminMembersOnly, _media4.default.__checkForNullInput, _media4.default.appendOrigin, _media2.default.create, _media4.default.__dispatchError).put('/:id', _media4.default.__ensureAuthorization, _media4.default.__ensureUser, _media4.default.adminMembersOnly, _media4.default.__checkForNullInput, _media2.default.updateOne, _media4.default.__dispatchError).delete('/:id', _media4.default.__ensureAuthorization, _media4.default.__ensureUser, _media4.default.adminMembersOnly, _media2.default.deleteOne, _media4.default.__dispatchError);

exports.default = router;