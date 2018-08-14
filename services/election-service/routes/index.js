import { Router } from 'express';
import { checkForAuthorization } from '../middlewares';
import { VerifyUserVin, IndexElection } from '../controllers';
import * as Position from '../controllers/positions';

const api = Router();

api
  .post('/verify', checkForAuthorization, VerifyUserVin)
  .post('/check/:questionID', checkForAuthorization, IndexElection)
  .post('/position', Position.ensureUsers, Position.createNewPosition)
  .get('/position', Position.ensureUsers, Position.fetchAllPositions)
  .get('/fetch/position', Position.ensureUsers, Position.fetchSinglePosition)
  .delete('/position', Position.ensureUsers, Position.DeletePosition)
  .post('/apply/position/:id', Position.ensureUsers, Position.ApplyForPosition)
  .get('/candidates', Position.ensureUsers, Position.fetchAllCandidates)
  .put('/position/:id', Position.ensureUsers, Position.changeStatusOfApplication)
  .get('/excos', Position.ensureUsers, Position.fetchExcos)
  .put('/excos', Position.ensureUsers, Position.changeExco);

export default api;
