import { BaseMiddlewareBase } from '../base';
import PostModel from '../../models/post'

let data
let err;
class PostMiddlewareBase extends BaseMiddlewareBase {
  appendOrigin = (req, res, next) => {
    req.body.origin = req.user;
    next();
  }

  contentOnlyEditable = (req, res, next) => {
    req.body = Object.assign({}, { content: req.body.content })
    next();
  }

  revokeAccess = async (req, res, next) => {
    data = await this.model.findById(req.params.id);
    if (data) {
      if (data.origin.id === req.user.id && data.destination === null) {
        return next();
      }
      if(req.user.role > 3) {
        return next();
      }
      err = new Error('You are not permitted to do that');
      err.status = 401;
      return next(err);
    }
    err = new Error('There is no such resource');
    err.status = 404;
    return next(err);
  }

}

const PostMiddleware = new PostMiddlewareBase(PostModel);

export default PostMiddleware;
