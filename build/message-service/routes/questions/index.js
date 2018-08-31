'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _questions = require('../../middlewares/questions/');

var _questions2 = _interopRequireDefault(_questions);

var _questions3 = require('../../controllers/questions/');

var _questions4 = _interopRequireDefault(_questions3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
/* eslint-disable no-underscore-dangle */
router.post('/', _questions2.default.__ensureAuthorization, _questions2.default.__ensureUser, _questions2.default.adminMembersOnly, _questions2.default.__checkForNullInput, _questions2.default.appendType, _questions4.default.create, _questions2.default.__dispatchError).get('/', _questions2.default.__ensureAuthorization, _questions2.default.__ensureUser, _questions4.default.fetchAll, _questions2.default.__dispatchError).get('/:id', _questions2.default.__ensureAuthorization, _questions2.default.__ensureUser, _questions4.default.fetchOne, _questions2.default.__dispatchError).delete('/:id', _questions2.default.__ensureAuthorization, _questions2.default.__ensureUser, _questions2.default.adminMembersOnly, _questions4.default.deleteOne, _questions2.default.__dispatchError).put('/respond', _questions2.default.__ensureAuthorization, _questions2.default.__ensureUser, _questions2.default.partyMembersOnly, _questions2.default.__checkForNullInput, _questions2.default.appendUser, _questions4.default.respond, _questions2.default.__dispatchError).get('/results/:id', _questions2.default.__ensureAuthorization, _questions2.default.__ensureUser, _questions2.default.partyMembersOnly, _questions4.default.fetchResults, _questions2.default.__dispatchError);
exports.default = router;