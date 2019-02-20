import PostService from '../../services/post-service';
import BaseController from '../base';

let data
let comments;
/* eslint no-underscore-dangle: 0 */
class PostControllerBase extends BaseController {
  getTimeline = (req, res, next) => {
    this.__wrapInTryCatch(async () => {
      const { user, access } = req;
      data = await this.service.getTimeline(user.username, access);
      this.__responseOkay(res, data);
    }, next);
  }

  fetchAllPosts = (req, res, next) => {
    this.__wrapInTryCatch(async () => {
      const { user, access } = req;
      data = await this.service.fetchAllPosts(req.params.id)
      this.__responseOkay(res, data);
    }, next);
  }

  like = (req, res, next) => {
    this.__wrapInTryCatch(async () => {
      const { user } = req;
      data = await this.service.like('_id', req.params.id, user, parseInt(req.query.type));
      this.__responseOkay(res, data);
    }, next);
  }

  fetchOne = (req, res, next) => {
    this.__wrapInTryCatch(async () => {
      data = await this.service.fetchOne('_id', req.params.id);
      comments = await this.service.fetchComments(data);
      this.__responseOkay(res, { data, comments });
    }, next);
  };

  report = (req, res, next) => {
    this.__wrapInTryCatch(async () => {
      const { user } = req;
      data = await this.service.report('_id', req.params.id, user, parseInt(req.query.type));
      this.__responseOkay(res, { data });
    }, next);
  }
}

const PostsController = new PostControllerBase(PostService);

export default PostsController
