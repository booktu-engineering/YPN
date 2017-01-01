import 'babel-polyfill'
import jwt from 'jsonwebtoken'
import PostModel from '../models/post';
import BaseService from './base';

const keyx = '6df7e61ce8cfc31f2c4f000fa5fcf7c0fb4c2395ea10818e2eb5e94efd008b022bae771d8fa30a4dc37dd06ed851554b5aa40e7b40dfb39acbc7a4282520c20a'
let ref = {};
let data;
let nt_token;
let notifications;
/* eslint no-useless-constructor: 0, no-return-await: 0, no-underscore-dangle: 0, object-curly-newline: 0, prefer-const: 0, max-len: 0, arrow-body-style: 0, camelcase: 0 */
class PostServiceObject extends BaseService {
  updateOne = async (key, value, changes) => {
    if (changes.content) {
      ref.content = changes.content;
      const map = {};
      map[`${key}`] = value;
      data = await this.model.findOne(map);
      data.content = ref.content;
      const update = await data.save();
      return update;
    }
    return await this.fetchOne(key, value);
  }

  __examineForMentions = async (body) => {
    data = body.content.split(' ');
    data = data.filter(item => item.charAt(0) === '@');
    if (data.length > 0 && body.type !== 2) {
      data = data.map(async (item) => {
        return await this.__fetchUser(item.subString(1, item.length));
      });
      data.length.forEach(async (item) => {
        ref.content = body.content;
        ref.origin = body.origin;
        ref.id = body.id;
        notifications = await jwt.verify(item.nt_token, keyx);
        const notification = { type: body.type, message: `You have a new notification from ${body.origin.name}`, referenceID: body._id, body: ref };
        notifications = [...notifications, notification];
        nt_token = await jwt.sign(notifications, keyx);
        this.__dispatchToNotificationServer({ ...notification, nt_token });
        const access = await jwt.sign({ id: item.id, role: item.role }, keyx);
        this.__updateUser({ nt_token }, access);
        return body;
      });
    }
    return body;
  }


}

const PostService = new PostServiceObject(PostModel);
export default PostService
