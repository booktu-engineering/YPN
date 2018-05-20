import axios from 'axios';
import EventModel from '../models/event';
import BaseService from './base';

/* eslint no-underscore-dangle: 0, prefer-const: 0 */
let ref = {};
let data;
let res;

class EventServiceBase extends BaseService {
  attendEvent = async (key, value, userId) => {
    this.__checkArguments(key, value);
    ref[`${key}`] = value;
    data = await this.model.findOne(ref);
    data.members.push(userId);
    await data.save;
    return data;
  }

  leaveEvent = async (key, value, userId) => {
    this.__checkArguments(key, value);
    ref[`${key}`] = value;
    data = await this.model.findOne(ref);
    data.members = data.members.filter(item => item !== userId);
    await data.save;
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
