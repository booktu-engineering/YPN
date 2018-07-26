import axios from 'axios';
import EventModel from '../models/event';
import BaseService from './base';
import configuration from './config';

const config = configuration();

/* eslint no-underscore-dangle: 0, prefer-const: 0 */
let ref = {};
let data;
let err = new Error()

/* eslint no-useless-constructor: 0 */
class EventServiceBase extends BaseService {

  attendEvent = async (key, value, user) => {
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

  fetchAllSync = async (role) => {
    data = await this.fetchAll();
    console.log(data)
    return data;
  }

  leaveEvent = async (key, value, user) => {
    this.__checkArguments(key, value);
    ref[`${key}`] = value;
    data = await this.model.findOne(ref);
    data.members = data.members.filter(item => item.id !== user.id);
    data = await data.save();
    return data;
  }

  fetchEventsForUser = async (id) => {
    data = await this.model.find({});
    data = data.map((event) => {
      const members = event.members.map(item => item.id).filter(item => item);
      if (members.includes(id) || event.origin.id === id) return event;
      return null;
    });
    data = data.filter(item => item);
    return data;
  }

  fetchMembers = async (key, value) => {
    this.__checkArguments(key, value);
    ref[`${key}`] = value;
    data = await this.model.findOne(ref);
    // make a call to the user service
    res = await axios.method({ method: 'POST', url: '', body: { data: data.attendees } });
  }
}

const EventService = new EventServiceBase(EventModel);

export default EventService;
