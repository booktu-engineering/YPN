import { Router } from 'express';
import MController from '../../controllers/media/';
import MMiddleware from '../../middlewares/media/';

const router = Router();

router
  .get('/',  MMiddleware.__ensureAuthorization, MMiddleware.__ensureUser, MController.fetchAll, MMiddleware.__dispatchError)
  .get('/:id', MMiddleware.__ensureAuthorization, MMiddleware.__ensureUser, MController.fetchOne, MMiddleware.__dispatchError)
  .post('/', MMiddleware.__ensureAuthorization, MMiddleware.__ensureUser, MMiddleware.adminMembersOnly, MMiddleware.__checkForNullInput, MMiddleware.appendOrigin, MController.create, MMiddleware.__dispatchError)
  .put('/:id', MMiddleware.__ensureAuthorization, MMiddleware.__ensureUser, MMiddleware.adminMembersOnly, MMiddleware.__checkForNullInput, MController.updateOne, MMiddleware.__dispatchError)
  .delete('/:id', MMiddleware.__ensureAuthorization, MMiddleware.__ensureUser, MMiddleware.adminMembersOnly, MController.deleteOne, MMiddleware.__dispatchError)

export default router;
