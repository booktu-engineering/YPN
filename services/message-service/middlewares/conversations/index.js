import { BaseMiddlewareBase } from '../base';
import ConversationModel from '../../models/conversation';

let err;
let data;
let source

/* eslint max-len: 0, radix: 0, no-restricted-globals: 0 */
class ConvoMiddlewareBase extends BaseMiddlewareBase {
  grantAccess = (req, res, next) => {
    if (!req.query.type || isNaN(parseInt(req.query.type))) {
      err = new Error('Please, send in the right type of conversation');
      err.status = 400;
      return next(err);
    }
    if (parseInt(req.query.type) > 1) {
      console.log(req.user.role)
      if (req.user.role > 3) return next();

      err = new Error('You do not have permissions to do that');
      err.status = 401;
      return next(err);
    }
    if (req.user.role > 0) return next();
    err = new Error('You do not have permissions to do that');
    err.status = 401;
    return next(err);
  }

  appendType = (req, res, next) => {
    req.body.type = req.query.type
    return next();
  }

  checkRequired = (req, res, next) => {
    if (parseInt(req.query.type) < 2) return next();
    const requiredForDebate = ['topic'];
    const requiredForTownHall = ['focus', 'endDate', 'startDate', 'details'];
    if (parseInt(req.query.type) > 2) {
      data = requiredForTownHall.map(item => req.body[`${item}`]).filter(item => !item);
      if (data.length === 0) return next();
      err = new Error('Some required fields to set up this town hall are missing');
      err.status = 422;
      return next(err);
    }

    data = requiredForDebate.map(item => req.body[`${item}`]).filter(item => !item);
    if (data.length === 0) return next();
    err = new Error('Some required fields to set up this debate are missing');
    err.status = 400;
    return next(err);
  }

  restrictAccess = async (req, res, next) => {
    data = await this.model.findById(req.params.id);
    if (data) {
      const { members } = data;
      data = members.map(item => item.id).filter(item => item);
      if (data.includes(req.user.id) || req.user.role > 3) {
        return next();
      }
      err = new Error('You do not have permissions to view these messages');
      err.status = 401;
      return next(err);
    }
    err = new Error('We couldnt find such a conversation');
    err.status = 404;
    return next(err);
  }

  filterAccess = async (req, res, next) => {
    data = await this.model.findById(req.params.id);
    if (data && data.type === 1) {
      const { invites } = data;
      source = invites.map(item => item.id).filter(item => item);
      if (source.includes(req.user.id) || req.user.role > 3) {
        if (data.members > 2 || source.includes(req.user.id)) return next();
        return this.noPermissions('You cannot join a personal conversation, because you havent been invited', next);
      }
      return this.noPermissions('You cannot join a personal conversation, because you havent been invited', next);
    } else if (data && data.type === 3) {
      let granted = false;
      Object.keys(data.details.inclusion).forEach((key) => {
        if (req.user[`${key}`] && req.user[`${key}`] === data.details.inclusion[`${key}`]) {
          granted = true;
        }
        granted = false;
      });
      if (granted) return next();
      return this.noPermissions('You cannot join a personal conversation, because you havent been invited', next);
    }
    if (data) return next();
    return this.notFound('You cannot join a personal conversation, because you havent been invited', next);
  }
}

const ConversationMiddleware = new ConvoMiddlewareBase(ConversationModel);

export default ConversationMiddleware;
