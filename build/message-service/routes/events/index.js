'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _events = require('../../middlewares/events');

var _events2 = _interopRequireDefault(_events);

var _events3 = require('../../controllers/events/');

var _events4 = _interopRequireDefault(_events3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();

/* eslint no-underscore-dangle: 0 */
router.post('/', _events2.default.__ensureAuthorization, _events2.default.__ensureUser, _events2.default.partyMembersOnly, _events2.default.__checkForNullInput, _events2.default.appendOrigin, _events4.default.create, _events2.default.__dispatchError).get('/', _events2.default.__ensureAuthorization, _events2.default.__ensureUser, _events2.default.partyMembersOnly, _events4.default.fetchAll, _events2.default.__dispatchError).get('/:id', _events2.default.__ensureAuthorization, _events2.default.__ensureUser, _events2.default.partyMembersOnly, _events4.default.fetchOne, _events2.default.__dispatchError).put('/confirm/:id', _events2.default.__ensureAuthorization, _events2.default.__ensureUser, _events2.default.adminMembersOnly, _events4.default.confirm, _events2.default.__dispatchError).put('/join/:id', _events2.default.__ensureAuthorization, _events2.default.__ensureUser, _events2.default.partyMembersOnly, _events4.default.participate, _events2.default.__dispatchError).put('/leave/:id', _events2.default.__ensureAuthorization, _events2.default.__ensureUser, _events2.default.partyMembersOnly, _events4.default.leave, _events2.default.__dispatchError).get('/user/:id', _events2.default.__ensureAuthorization, _events2.default.__ensureUser, _events4.default.fetchEventsForUser, _events2.default.__dispatchError).put('/:id', _events2.default.__ensureAuthorization, _events2.default.__ensureUser, _events2.default.revokeAccess, _events2.default.__checkForNullInput, _events4.default.updateOne, _events2.default.__dispatchError).delete('/:id', _events2.default.__ensureAuthorization, _events2.default.__ensureUser, _events2.default.OwnerOrAdminAccess, _events4.default.deleteOne, _events2.default.__dispatchError);
exports.default = router;