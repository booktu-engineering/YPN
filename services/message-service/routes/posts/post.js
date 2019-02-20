import { Router } from 'express';
import PostMiddleware from '../../middlewares/posts';
import PostController from '../../controllers/posts'

const router = Router();
/* eslint max-len: 0, no-underscore-dangle: 0 */

// This should return the timeline of a user
router.get('/', PostMiddleware.__ensureAuthorization, PostMiddleware.__ensureUser, PostController.getTimeline, PostMiddleware.__dispatchError);

// should enable only party members create post
router.post('/', PostMiddleware.__ensureAuthorization, PostMiddleware.__ensureUser, PostMiddleware.partyMembersOnly, PostMiddleware.__checkForNullInput, PostMiddleware.appendOrigin, PostController.create, PostMiddleware.__dispatchError);

// should everyone get a single post PS: remember to write another that allows users do some cool things
router.get('/:id', PostController.fetchOne, PostMiddleware.__dispatchError);

// should edit the post
router.put('/:id', PostMiddleware.__ensureAuthorization, PostMiddleware.__ensureUser, PostMiddleware.revokeAccess, PostMiddleware.__checkForNullInput, PostMiddleware.contentOnlyEditable, PostController.updateOne, PostMiddleware.__dispatchError);

// should delete the post
router.delete('/:id', PostMiddleware.__ensureAuthorization, PostMiddleware.__ensureUser, PostMiddleware.revokeAccess, PostController.deleteOne, PostMiddleware.__dispatchError);

router.put('/like/:id', PostMiddleware.__ensureAuthorization, PostMiddleware.__ensureUser, PostController.like, PostMiddleware.__dispatchError)

router.post('/report/:id', PostMiddleware.__ensureAuthorization, PostMiddleware.__ensureUser, PostController.report, PostMiddleware.__dispatchError)

// do something here.
router.get('/all/:id', PostMiddleware.__ensureAuthorization, PostMiddleware.__ensureUser, PostController.fetchAllPosts, PostMiddleware.__dispatchError);
export default router
