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
    return null
    // throw an error here for null object
  }

  getTimeline = async (body) => {
    if (body.constructor !== Array) {
      this.__unprocessableEntity();
    }
    data = await Post.find({ type: 1 });
    data = data.filter(item => body.includes(item.origin.id));
    return data;
  }

  extendInvite = async (key, value, user) => {
    this.__checkArguments(key, value);
    ref[`${key}`] = value;
    data = await this.model.findOne(ref);
    if (data) {
      if (data.invites < 1) {
        data.invites.push(user);
        data = await data.save();
        return data;
      }
      else if (data.invites.map(item => item.id).includes(user.id)) return data
      data.invites.push(user);
      data = await data.save();
      return data;
    }
    return null;
  }

}

const ConversationServiceObject = new ConversationService(ConversationModel);

export default ConversationServiceObject;
