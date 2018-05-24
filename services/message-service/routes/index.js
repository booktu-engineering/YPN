import { Router } from 'express';
import postRouter from './posts/post';
import eventRouter from './events/';
import conversationRouter from './conversations/'

const router = new Router();

router
  .use('/posts', postRouter)
  .use('/events', eventRouter)
  .use('/convos/', conversationRouter)

export default router
