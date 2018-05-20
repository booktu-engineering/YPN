import { BaseMiddlewareBase } from './base';
import PostModel from '../models/post';

let err;
let data;
/* eslint radix: 0 */
class PostMiddlewareBase extends BaseMiddlewareBase {
  constructor(model) {
    super();
    this.model = model;
  }

  __blockEditAndDelete = async (req, res, next) => {
    data = await this.model.findById(parseInt(req.params.id));
    if (!data || data.type === 2) {
      err = new Error('Sorry, you cannot edit or delete messages');
      err.status = 401;
      return next(err);
    }
    next();
  }

  __revokeAccess = async (req, res, next) => {
    data = await this.model.findById(parseInt(req.params.id));
    if (data.origin.id !== req.user.id || req.user.role > 4) {
      err = new Error('Sorry, you cannot make changes to this post');
      err.status = 401;
      return next(err);
    }
    next();
  }
}

const PostMiddleware = new PostMiddlewareBase(PostModel);
export default PostMiddleware;
