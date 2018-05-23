import { Router } from 'express';
import postRouter from './posts/post';
import eventRouter from './events/';

const router = new Router();

router.use('/posts', postRouter)
router.use('/events', eventRouter)

export default router
