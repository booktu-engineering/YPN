import { Router } from 'express';
import EventMiddleware from '../../middlewares/events';
import EventController from '../../controllers/events/';

const router = Router();

/* eslint no-underscore-dangle: 0 */
router
  .post('/', EventMiddleware.__ensureAuthorization, EventMiddleware.__ensureUser, EventMiddleware.partyMembersOnly, EventMiddleware.__checkForNullInput, EventMiddleware.appendOrigin, EventController.create, EventMiddleware.__dispatchError)

  .get('/', EventMiddleware.__ensureAuthorization, EventMiddleware.__ensureUser, EventMiddleware.partyMembersOnly, EventController.fetchAll, EventMiddleware.__dispatchError)

  .get('/:id', EventMiddleware.__ensureAuthorization, EventMiddleware.__ensureUser, EventMiddleware.partyMembersOnly, EventController.fetchOne, EventMiddleware.__dispatchError)

  .put('/confirm/:id', EventMiddleware.__ensureAuthorization, EventMiddleware.__ensureUser, EventMiddleware.adminMembersOnly, EventController.confirm, EventMiddleware.__dispatchError)

  .put('/join/:id', EventMiddleware.__ensureAuthorization, EventMiddleware.__ensureUser, EventMiddleware.partyMembersOnly, EventController.participate, EventMiddleware.__dispatchError)

  .put('/leave/:id', EventMiddleware.__ensureAuthorization, EventMiddleware.__ensureUser, EventMiddleware.partyMembersOnly, EventController.leave, EventMiddleware.__dispatchError)

  .get('/user/:id', EventMiddleware.__ensureAuthorization, EventMiddleware.__ensureUser, EventController.fetchEventsForUser, EventMiddleware.__dispatchError)

  .put('/:id', EventMiddleware.__ensureAuthorization, EventMiddleware.__ensureUser, EventMiddleware.revokeAccess, EventMiddleware.__checkForNullInput, EventController.updateOne, EventMiddleware.__dispatchError)

  .delete('/:id', EventMiddleware.__ensureAuthorization, EventMiddleware.__ensureUser, EventMiddleware.OwnerOrAdminAccess, EventController.deleteOne, EventMiddleware.__dispatchError);
export default router;
