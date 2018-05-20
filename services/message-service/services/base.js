let data;


/* eslint no-return-await: 0, prefer-const: 0, no-underscore-dangle: 0 */
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

  updateOne = async (key, value, changes) => {
    this.__checkArguments(key, value);
    let ref = {};
    ref[`${key}`] = value;
    data = await this.model.findAndUpdate(ref, changes);
    return data;
  }

  participate = async (key, value, userId) => {
    this.__checkArguments(key, value);
    let ref = {};
    ref[`${key}`] = value;
    data = await this.model.findOne(ref);
    data.members.push(userId);
    await data.save;
    return data;
  }

  leave = async (key, value, userId) => {
    this.__checkArguments(key, value);
    let ref = {};
    ref[`${key}`] = value;
    data = await this.model.findOne(ref);
    data.members = data.members.filter(item => item !== userId);
    await data.save;
    return data;
  }


  __checkArguments = (key, value) => {
    if (!key || !value || (typeof key) !== 'string') {
      console.log(key)
      console.log(value);
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
