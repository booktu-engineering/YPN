import { BaseMiddlewareBase } from '../base';
import PostModel from '../../models/post'


class PostMiddlewareBase extends BaseMiddlewareBase {
  appendOrigin = (req, res, next) => {
    req.body.origin = req.user;
    next();
  }

  contentOnlyEditable = (req, res, next) => {
    req.body = Object.assign({}, { content: req.body.content })
    next();
  }
}

const PostMiddleware = new PostMiddlewareBase(PostModel);

export default PostMiddleware;
