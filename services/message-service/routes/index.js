import { Router } from 'express';
import postRouter from './posts/post';
import eventRouter from './events/';
import conversationRouter from './conversations/';
import QRouter from './questions/'
import DRouter from './donations/'

const router = new Router();

router
  .use('/posts', postRouter)
  .use('/events', eventRouter)
  .use('/convos/', conversationRouter)
  .use('/questions/', QRouter)
  .use('/donations/', DRouter)

export default router
