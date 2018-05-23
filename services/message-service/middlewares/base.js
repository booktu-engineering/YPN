import { decodeToken } from '../helpers/keys';

let data;
let err;
let payload;
/* eslint no-underscore-dangle: 0, prefer-destructuring: 0, radix: 0, no-return-assign: 0, no-restricted-globals: 0, max-len: 0, no-multiple-empty-lines: 0 */
export class BaseMiddlewareBase {
  constructor(model) {
    this.model = model;
  }


  partyMembersOnly = async (req, res, next) => {
    if (!req.user || req.user.role < 1) {
      err = new Error('Sorry you are not authorized to do this');
      err.status = 401;
      return next(err);
    }
    next();
  }


  adminMembersOnly = async (req, res, next) => {
    if (!req.user || req.user.role < 3) {
      err = new Error('Sorry you are not authorized to do this');
      err.status = 401;
      return next(err);
    }
    next();
  }


  revokeAccess = async (req, res, next) => {
    data = await this.model.findById(req.params.id);
    if (data) {
      if (data.origin.id === req.user.id) {
        return next();
      }
      err = new Error('You are not permitted to do that');
      err.status = 401;
      return next(err);
    }
    err = new Error('There is no such resource');
    err.status = 404;
    return next(err);
  }


  OwnerOrAdminAccess = async (req, res, next) => {
    data = await this.model.findById(req.params.id);
    if (data) {
      if (data.origin.id === req.user.id || req.user.role > 3) return next();
      err = new Error('You are not permitted to do that, Sorry');
      err.status = 401;
      return next(err);
    }
    err = new Error('There is no such resource');
    err.status = 404;
    return next(err);
  }


  appendOrigin = (req, res, next) => {
    req.body.origin = req.user;
    next();
  }


  __ensureUser = async (req, res, next) => {
    payload = await this.__decodeToken(req.headers.authorization);
    req.user = payload;
    req.access = req.headers.authorization;
    next();
  }


  __ensureAuthorization = (req, res, next) => {
    if (!req.headers.authorization) {
      err = new Error('Please ensure that there is a user token sent with the request');
      err.status = 400;
      return next(err);
    }
    next();
  }


  __checkParams = (req, res, next) => {
    let culprit;
    Object.entries(req.params).forEach((params) => {
      if (isNaN(parseInt(params[1]))) {
        return culprit = params[0];
      }
    });
    if (culprit) {
      err = new Error(`Please make sure the params are numbers, ${culprit} might be wrong`);
      err.status = 400;
      return next(err);
    }
    next();
  }




  __checkForNullInput = (req, res, next) => {
    let culprit;
    Object.entries(req.body).forEach((content) => {
      if (content[1].length < 1) {
        culprit = content[0];
      }
    });
    if (culprit) {
      err = new Error(`Please check that you're not sending an empty body, ${culprit} might be wrong`);
      err.status = 400;
      return next(err);
    }
    next();
  }




__dispatchError = (err, req, res, next) => {
  const status = err.status ? err.status : 500;
  res.status(status).json({ error: err.message });
}

  __decodeToken = async (token) => {
    data = await decodeToken(token);
    return data;
  }
}

const BaseMiddleware = new BaseMiddlewareBase();
export default BaseMiddleware;
