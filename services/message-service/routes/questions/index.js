import { Router } from 'express';
import QMiddleware from '../../middlewares/questions/';
import QController from '../../controllers/questions/';

const router = Router();
/* eslint-disable no-underscore-dangle */
router
  .post('/', QMiddleware.__ensureAuthorization, QMiddleware.__ensureUser, QMiddleware.adminMembersOnly, QMiddleware.__checkForNullInput, QMiddleware.appendType, QController.create, QMiddleware.__dispatchError)
  .get('/', QMiddleware.__ensureAuthorization, QMiddleware.__ensureUser, QController.fetchAll, QMiddleware.__dispatchError)
  .get('/:id', QMiddleware.__ensureAuthorization, QMiddleware.__ensureUser, QController.fetchOne, QMiddleware.__dispatchError)
  .delete('/:id', QMiddleware.__ensureAuthorization, QMiddleware.__ensureUser, QMiddleware.adminMembersOnly, QController.deleteOne, QMiddleware.__dispatchError )
  .put('/respond', QMiddleware.__ensureAuthorization, QMiddleware.__ensureUser, QMiddleware.partyMembersOnly, QMiddleware.__checkForNullInput, QMiddleware.appendUser, QController.respond, QMiddleware.__dispatchError)
  .get('/results/:id', QMiddleware.__ensureAuthorization, QMiddleware.__ensureUser, QMiddleware.partyMembersOnly, QController.fetchResults, QMiddleware.__dispatchError);
export default router
