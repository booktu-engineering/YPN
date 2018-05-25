import { Router } from 'express';
import DMiddleware from '../../middlewares/donation';
import DController from '../../controllers/donations';

const router = Router();

router
  .get('/', DMiddleware.__ensureAuthorization, DMiddleware.__ensureUser, DController.fetchAll, DMiddleware.__dispatchError)
  .post('/', DMiddleware.__ensureAuthorization, DMiddleware.__ensureUser, DMiddleware.adminMembersOnly, DMiddleware.__checkForNullInput, DMiddleware.validate, DController.create, DMiddleware.__dispatchError)
  .put('/:id', DMiddleware.__ensureAuthorization, DMiddleware.__ensureUser, DMiddleware.adminMembersOnly, DMiddleware.__checkForNullInput, DController.updateOne, DMiddleware.__dispatchError)
  .put('/donate/:id', DMiddleware.__ensureAuthorization, DMiddleware.__ensureUser, DMiddleware.appendUser, DMiddleware.revokeDonation, DController.donate, DMiddleware.__dispatchError)
  .get('/:id', DMiddleware.__ensureAuthorization, DMiddleware.__ensureUser, DController.fetchOne, DMiddleware.__dispatchError)
  .delete('/:id', DMiddleware.__ensureAuthorization, DMiddleware.__ensureUser, DMiddleware.adminMembersOnly, DController.deleteOne, DMiddleware.__dispatchError);

export default router;
