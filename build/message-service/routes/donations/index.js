'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _donation = require('../../middlewares/donation');

var _donation2 = _interopRequireDefault(_donation);

var _donations = require('../../controllers/donations');

var _donations2 = _interopRequireDefault(_donations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();

router.get('/', _donation2.default.__ensureAuthorization, _donation2.default.__ensureUser, _donations2.default.fetchAll, _donation2.default.__dispatchError).post('/', _donation2.default.__ensureAuthorization, _donation2.default.__ensureUser, _donation2.default.adminMembersOnly, _donation2.default.__checkForNullInput, _donation2.default.validate, _donations2.default.create, _donation2.default.__dispatchError).put('/:id', _donation2.default.__ensureAuthorization, _donation2.default.__ensureUser, _donation2.default.adminMembersOnly, _donation2.default.__checkForNullInput, _donations2.default.updateOne, _donation2.default.__dispatchError).put('/donate/:id', _donation2.default.__ensureAuthorization, _donation2.default.__ensureUser, _donation2.default.appendUser, _donation2.default.revokeDonation, _donations2.default.donate, _donation2.default.__dispatchError).get('/:id', _donation2.default.__ensureAuthorization, _donation2.default.__ensureUser, _donations2.default.fetchOne, _donation2.default.__dispatchError).delete('/:id', _donation2.default.__ensureAuthorization, _donation2.default.__ensureUser, _donation2.default.adminMembersOnly, _donations2.default.deleteOne, _donation2.default.__dispatchError);

exports.default = router;