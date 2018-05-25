import QuestionModel from '../../models/question';
import { BaseMiddlewareBase } from '../base';

class QuestionMiddlewareBase extends BaseMiddlewareBase {

  appendUser = (req, res, next) => {
    req.body.user = req.user;
    next();
  }

}

const QuestionMiddleware = new QuestionMiddlewareBase(QuestionModel);
export default QuestionMiddleware;
