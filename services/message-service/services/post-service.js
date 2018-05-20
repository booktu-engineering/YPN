import 'babel-polyfill'
import PostModel from '../models/post';
import BaseService from './base';

let ref = {}
let data;
/* eslint no-useless-constructor: 0, no-return-await: 0 */
class PostServiceObject extends BaseService {
  updateOne = async (key, value, changes) => {
    console.log('Yay')
    if (changes.content) {
      ref.content = changes.content;
      const map = {};
      map[`${key}`] = value;
      data = await this.model.findOne(map);
      data.content = ref.content;
      const update = await data.save();
      return update
    }
    return await this.fetchOne(key, value);
  }


}

const PostService = new PostServiceObject(PostModel);
export default PostService
