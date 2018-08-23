import io from 'socket.io-client';
import axios from 'axios';
import configuration from './config';

const config = configuration()

let data;
let instance;
let err;

/* eslint no-return-await: 0, prefer-const: 0, no-underscore-dangle: 0, no-console: 0 */

class BaseService {
  constructor(model) {
    this.model = model;
  }

  create = async (body) => {
    if (!body || body.constructor !== Object) {
      this.__unprocessableEntity('Please pass in the right values for the body');
    }
    data = await this.model.create(body);
    return data;
  }


  fetchOne = async (key, value) => {
    this.__checkArguments(key, value);
    let ref = {};
    ref[`${key}`] = value;
    return await this.model.findOne(ref);
  }


  fetchAll = async () => await this.model.find({});


  deleteOne = async (key, value) => {
    this.__checkArguments(key, value);
    let ref = {};
    ref[`${key}`] = value;
    await this.model.findOneAndDelete(ref);
    return true;
  }

  archiveOne = async (key, value) => {
    return await this.updateOne(key, value, { archived: true });
  }


  updateOne = async (key, value, changes) => {
    this.__checkArguments(key, value);
    let ref = {};
    ref[`${key}`] = value;
    data = await this.model.findOne(ref);
    Object.keys(changes).forEach((item) => {
      if (Object.keys(data._doc).includes(`${item}`)) {
        data[`${item}`] = changes[`${item}`];
      }
    });
    data = await data.save();
    return data;
  }



  participate = async (key, value, user) => {
    let ref = {};
    this.__checkArguments(key, value);
    ref[`${key}`] = value;
    data = await this.model.findOne(ref);
    if (!data.members.map(item => item.id).includes(user.id)) {
      data.members.push(user);
      data = await data.save();
      return data;
    }
    err = new Error('You joined this already');
    err.status = 409;
    throw err;
  }


  leave = async (key, value, user) => {
    this.__checkArguments(key, value);
    let ref = {};
    ref[`${key}`] = value;
    data = await this.model.findOne(ref);
    data.members = data.members.filter(item => item.id !== user.id);
    data = await data.save();
    return data;
  }


  // __dispatchToNotificationServer = (body, username) => {
  //   const socket = io('config.notificationUrl/base');
  //   socket.to(`room-${username}`).emit('new notification', body);
  // }


  __updateUser = async (body, access) => {
    instance = axios.create({ baseURL: config.baseUrl, headers: { Authorization: access } });
    instance.put('/user', body)
      .then((response) => {
        console.log(`Successfully updated ${response.data.data.username}`);
      })
      .catch((err) => {
        console.log(err.message);
        return null;
      });
  };

  __dispatchToNotificationServer = async (mail, notification, key) => {
    instance = axios.create({ baseURL: config.notificationUrl });
    instance.post('/receive', { mail, notification, key })
      .then(() => {
        console.log('Successfully dispatched notification');
      });
  }

  __fetchUser = async (username, access) => {
    try {
      instance = await axios.create({ baseURL: config.baseUrl, headers: { Authorization: access } });
      const response = await instance.post('/fetch', { user: { username } });
      return response.data;
    } catch (e) {
      console.log(e)
      return null
    }
  };

  fetchDataForUser = async (id) => {
    data = await this.model.find({}).sort({ updatedAt: -1 });
    data = data.map((key) => {
      const members = key.members.map(item => item.id).filter(item => item);
      if (members.includes(id) || key.origin.id === id) return key;
      return null;
    });
    data = data.filter(item => item);
    return data;
  }


  __checkArguments = (key, value) => {
    if (!key || !value || (typeof key) !== 'string') {
      this.__unprocessableEntity('Something might be wrong with the values you passed in');
    }
  }

  __unprocessableEntity = (message) => {
    const e = new Error(message);
    e.status = 422;
    throw e;
  }

  __notFoundError = () => {
    const e = new Error('Sorry we could not find that resource');
    e.status = 404;
    throw e;
  }
}

export default BaseService
