'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _conversations = require('../../middlewares/conversations');

var _conversations2 = _interopRequireDefault(_conversations);

var _conversations3 = require('../../controllers/conversations');

var _conversations4 = _interopRequireDefault(_conversations3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-underscore-dangle */
var router = (0, _express.Router)();

router.post('/', _conversations2.default.__ensureAuthorization, _conversations2.default.__ensureUser, _conversations2.default.grantAccess, _conversations2.default.__checkForNullInput, _conversations2.default.checkRequired, _conversations2.default.appendType, _conversations2.default.appendOrigin, _conversations4.default.create, _conversations2.default.__dispatchError).get('/:id', _conversations2.default.__ensureAuthorization, _conversations2.default.__ensureUser, _conversations2.default.restrictAccess, _conversations4.default.fetchOne, _conversations2.default.__dispatchError).put('/join/:id', _conversations2.default.__ensureAuthorization, _conversations2.default.__ensureUser, _conversations2.default.filterAccess, _conversations4.default.participate, _conversations2.default.__dispatchError).put('/invite/:id', _conversations2.default.__ensureAuthorization, _conversations2.default.__ensureUser, _conversations2.default.OwnerOrAdminAccess, _conversations4.default.extendInvite, _conversations2.default.__dispatchError).put('/leave/:id', _conversations2.default.__ensureAuthorization, _conversations2.default.__ensureUser, _conversations4.default.leave, _conversations2.default.__dispatchError).get('/', _conversations2.default.__ensureAuthorization, _conversations2.default.__ensureUser, _conversations4.default.fetchDataForUser, _conversations2.default.__dispatchError).delete('/:id', _conversations2.default.__ensureAuthorization, _conversations2.default.__ensureUser, _conversations2.default.adminMembersOnly, _conversations4.default.deleteOne, _conversations2.default.__dispatchError).get('/all', _conversations2.default.__ensureAuthorization, _conversations2.default.__ensureUser, _conversations2.default.adminMembersOnly, _conversations4.default.fetchAll, _conversations2.default.__dispatchError).get('/type/:type', _conversations2.default.__ensureAuthorization, _conversations2.default.__ensureUser, _conversations4.default.getSpecific, _conversations2.default.__dispatchError);
exports.default = router;