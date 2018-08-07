import { Router } from 'express';
import ConversationMiddleware from '../../middlewares/conversations';
import ConversationController from '../../controllers/conversations';
/* eslint-disable no-underscore-dangle */
const router = Router();

router
  .post('/', ConversationMiddleware.__ensureAuthorization, ConversationMiddleware.__ensureUser, ConversationMiddleware.grantAccess, ConversationMiddleware.__checkForNullInput, ConversationMiddleware.checkRequired, ConversationMiddleware.appendType, ConversationMiddleware.appendOrigin, ConversationController.create, ConversationMiddleware.__dispatchError)
  .get('/:id', ConversationMiddleware.__ensureAuthorization, ConversationMiddleware.__ensureUser, ConversationMiddleware.restrictAccess, ConversationController.fetchOne, ConversationMiddleware.__dispatchError)
  .put('/join/:id', ConversationMiddleware.__ensureAuthorization, ConversationMiddleware.__ensureUser, ConversationMiddleware.filterAccess, ConversationController.participate, ConversationMiddleware.__dispatchError)
  .put('/invite/:id', ConversationMiddleware.__ensureAuthorization, ConversationMiddleware.__ensureUser, ConversationMiddleware.OwnerOrAdminAccess, ConversationController.extendInvite, ConversationMiddleware.__dispatchError)
  .put('/leave/:id', ConversationMiddleware.__ensureAuthorization, ConversationMiddleware.__ensureUser, ConversationController.leave, ConversationMiddleware.__dispatchError)
  .get('/', ConversationMiddleware.__ensureAuthorization, ConversationMiddleware.__ensureUser, ConversationController.fetchDataForUser, ConversationMiddleware.__dispatchError)
  .delete('/:id', ConversationMiddleware.__ensureAuthorization, ConversationMiddleware.__ensureUser, ConversationMiddleware.adminMembersOnly, ConversationController.deleteOne, ConversationMiddleware.__dispatchError)
  .get('/all', ConversationMiddleware.__ensureAuthorization, ConversationMiddleware.__ensureUser, ConversationMiddleware.adminMembersOnly, ConversationController.fetchAll, ConversationMiddleware.__dispatchError)
  .get('/type/:type', ConversationMiddleware.__ensureAuthorization, ConversationMiddleware.__ensureUser, ConversationController.getSpecific, ConversationMiddleware.__dispatchError);
export default router;
