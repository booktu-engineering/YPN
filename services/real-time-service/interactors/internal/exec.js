import axios from 'axios';
import PostModel from './model'

const url = `https://ypn-node-service.herokuapp.com/api/posts`

class PostServiceBase {

  constructor(model, fetcher) {
    if (!model) {
      throw new Error('Please send in the right model')
    }
    this.model = model;
    this.fetcher = fetcher;
  }

  internalCreate = (body) => {
    this.model.create(body, (err, data) => {
      if (err) return err.message;
      console.log(`Successfully created the ${data._id}`);
    });
  }

  externalCreate = (data) => {
    return this.fetcher.request({ method: 'post', url, data })
      .then(() => {
        console.log('External service successfully created the message');
      })
      .catch(() => {
        console.log('Something went wrong trying to create it');
      });
  }

}

const PostService = new PostServiceBase(PostModel, axios);
export default PostService;
