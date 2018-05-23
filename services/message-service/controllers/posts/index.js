import PostService from '../../services/post-service';
import BaseController from '../base';

let data
/* eslint no-underscore-dangle: 0 */
class PostControllerBase extends BaseController {
  getTimeline = (req, res, next) => {
    this.__wrapInTryCatch(async () => {
      const { user, access } = req;
      data = await this.service.getTimeline(user.username, access);
      this.__responseOkay(res, data);
    }, next);
  }
}

const PostsController = new PostControllerBase(PostService);

export default PostsController
