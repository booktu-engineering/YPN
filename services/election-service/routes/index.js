import { Router } from 'express'
import { checkForAuthorization } from '../middlewares/';
import { VerifyUserVin, IndexElection } from '../controllers/'

const api = Router()

api
    .post('/verify', checkForAuthorization, VerifyUserVin)
    .post('/check/:questionID', checkForAuthorization, IndexElection)

export default api;