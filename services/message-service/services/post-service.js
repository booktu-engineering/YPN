import jwt from 'jsonwebtoken';
import PostModel from '../models/post';
import BaseService from './base';
import ConversationService from './conversation-service';
import { key } from '../helpers/keys';

let ref = {};
let data;
let nt_token;
let notifications;
let notification;
let filler;
let body;
let access;

/* eslint no-useless-constructor: 0, no-await-in-loop: 0, no-return-await: 0, no-underscore-dangle: 0, object-curly-newline: 0, prefer-const: 0, max-len: 0, arrow-body-style: 0, camelcase: 0 */
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

  create = async (body, access) => {
    if (!body || body.constructor !== Object) {
      this.__unprocessableEntity('Please pass in the right values for the body');
    }
    const post = await this.model.create(body);
    if (post.referenceID !== null) await this.__dispatchComment({ ...post._doc, subject: 'Someone replied to your post' });
    this.__examineForMentions(post._doc, access);
    if (post.destination !== null) this.__dispatchMessage(post._doc);
    return post;
  }

  __formatNotification = () => {

  }

  __dispatchComment = async (data) => {
    ref.content = data.content;
    ref.origin = data.origin;
    ref.id = data._id;
    notification = { 
      type: data.type, 
      message: `${data.origin.username} replied your ${data.destination ? 'message' : 'post'}`, 
      referenceID: data._id, 
      body: ref, 
      time: Date.now(), 
      destination: data.referenceObject.origin.username,
      destinationID: data.referenceObject.origin.id
    };
    data = { ...data, destination: data.referenceObject.origin.email, subject: data.subject };
    await this.__updateReference(data.referenceObject, 1);
    this.__dispatchToNotificationServer(data, { ...notification }, 5, data.origin);
  };

  __updateReference = async (data, key) => {
    const generateCount = (target) => {
      if (!target.commentCount) {
        if (key === 1) return 1;
        return 0;
      }
      return key === 1 ? target.commentCount + 1 : target.commentCount - 1;
    };
    const target = await this.model.findOneAndUpdate({ _id: data._id }, {$set: { commentCount: generateCount(data) }},{ new: true });
  }

  deleteOne = async (key, value) => {
    this.__checkArguments(key, value);
    let ref = {};
    ref[`${key}`] = value;
    data = await this.model.findOne(ref);
    if (data.referenceID) {
      this.__updateReference(data.referenceObject, 2);
    }
    await this.model.findOneAndDelete(ref);
    return true;
  }

  __dispatchMessage = async (message) => {
    let convo = await ConversationService.fetchOne('_id', message.destination);
    if (!convo || convo.type !== 1) return;
    // doing this so that he/she doesnt send a mail to himself/herself
    let members = convo.members.filter(item => item.id !== message.origin.id);
    members.forEach(item => this.__dispatchToNotificationServer({ ...message,  destination: item.email, subject: `${message.origin.username} sent you a message on Youth Party Nigeria` }, { destination: item.username, destinationID: item.id, message: `${message.origin.username} sent you a message on Youth Party Nigeria` }, 4), message.origin);
  }

  __updateNotifications = async (token, notification, destination) => {
    notifications = await jwt.verify(token, key);
    notifications = [notification, ...notifications.notifications];
    nt_token = await jwt.sign({ notifications }, key);
    access = jwt.sign({ id: destination.id, role: destination.role }, key);
    this.__updateUser({ nt_token }, access);
    return nt_token;
  }

  __examineForMentions = async (body, access) => {
    let newdata = [];
    data = body.content.split(' ');
    data = data.filter(item => item.charAt(0) === '@');
    if (data.length > 0 && body.type !== 2) {
      /* eslint-disable no-restricted-syntax */
      for (const item of data) {
        const e = await this.__fetchUser(item.substring(1, item.length), access);
        newdata.push(e);
      }

      data = newdata.filter(item => item).map(item => item.data);
      if (data.length > 0) {
        data.forEach(async (item) => {
          ref.content = body.content;
          ref.origin = body.origin;
          ref.id = body._id;
          notification = { type: body.type, message: `You were mentioned in ${body.origin.username}'s post`, referenceID: body._id, body: ref, destination: item.username, destinationID: item.id, time: Date.now() };
          this.__dispatchToNotificationServer({ ...body, destination: item.email, subject: `New mention by ${body.origin.username} on Youth Party Nigeria App` }, { ...notification, nt_token }, 5, body.origin);
          return body;
        });
      }
    }
    return body;
  }


  getTimeline = async (username, access) => {
    data = await this.__fetchUser(username, access);
    body = data ? data.friends.filter(item => item).map(item => item.id) : [];
    body.push(data.data.id);
    return await ConversationService.getTimeline(body);
  }


  like = async (key, value, user, type) => {
    data = await this.fetchOne('_id', value);
    if (type === 0) {
      data.likes.count += 1;
      data.likes.data.push(user);
      notification = { type: data.type, message: `${user.username} liked your ${data.destination ? 'message' : 'post'}`, referenceID: data._id, body: { id: data._id, content: data.content, origin: data.origin}, time: Date.now(), destination: data.origin.username, destinationID: data.origin.id };
      this.__dispatchToNotificationServer({ ...data._doc, origin: { username: user.username }, destination: data.origin.email, subject: `${user.username} liked your post on Youth Party Nigeria` }, { ...notification, nt_token }, 5, user);
    } else if (type === 1) {
      filler = data.likes.data.filter(item => item.id === user.id);
      if (filler.length < 1) return data;
      data.likes.count -= 1;
      data.likes.data = data.likes.data.filter(item => item.id !== user.id);
    }
    const dataX = await this.model.findOneAndUpdate({ _id: data._id }, {$set: { likes: data.likes } }, { new: true });
    return data;
  }

  fetchAllPosts = async (id) => {
    data = await this.model.find({ 'origin.id': parseInt(id), destination: null, referenceID: null }).sort({ createdAt: -1 });
    return data;
  }

  fetchComments = async (data) => {
    data = await this.model.find({ referenceID: data._id });
    return data;
  }

  report = async (value) => {
    data = await this.fetchOne('_id', value);
    data.reported = data.reported ? data.reported : 0;
    data.reported += 1
    const MAXIMUM_NUMBER_OF_REPORTS = 5
    if (data.reported > MAXIMUM_NUMBER_OF_REPORTS) {
      data.reportedTooManyTimes = true;
    }
    await this.model.findOneAndUpdate({ _id: data._id }, {$set: { reported: data.reported, reportedTooManyTimes: data.reportedTooManyTimes } }, { new: true });
    return data
  }
}

const PostService = new PostServiceObject(PostModel);
export default PostService;
