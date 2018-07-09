import axios from 'axios';
import PostModel from './model';

const url = 'https://ypn-node-service.herokuapp.com/api/v1/posts';

class PostServiceBase {
  constructor(model, fetcher) {
    if (!model) {
      throw new Error('Please send in the right model');
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
    axios.request({
      url,
      data,
      method: 'post',
      headers: {
        Authorization: data.token
      }
    })
      .then(() => {
        console.log('Data created from the external api');
      })
      .catch(() => {
      // some message got lost in the db
        console.log('Yo the external service couldnt create the guy');
      });
  }
}

const PostService = new PostServiceBase(PostModel, axios);
export default PostService;
