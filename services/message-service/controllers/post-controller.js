import PostService from '../services/post-service';
import BaseController from './base';

class PostControllerBase extends BaseController {

}

const PostsController = new PostControllerBase(PostService);
