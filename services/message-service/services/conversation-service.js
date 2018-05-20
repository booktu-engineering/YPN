import ConversationModel from '../models/conversation';
import Post from '../models/post';
import BaseService from './base';

let data;
let ref = {};
/* eslint no-underscore-dangle: 0, no-return-await: 0, prefer-const: 0 */
class ConversationService extends BaseService {

  fetchOne = async (key, value) => {
    this.__checkArguments(key, value);
    ref[`${key}`] = value;
    data = await this.model.findOne(ref);
    if (data) {
      const messages = await data.getMessages();
      return { ...data._doc, messages };
    }
    // throw an error here for null object
  }

  getTimeline = async (body) => {
    if (body.constructor !== Array || body.length < 1) {
      this.__unprocessableEntity();
    }
    data = await Post.find({ type: 1 });
    data = data.filter(item => body.includes(item.origin.id));
    return data;
  }

}

const ConversationServiceObject = new ConversationService(ConversationModel);

export default ConversationServiceObject;
