import jwt from 'jsonwebtoken';

let data;
let user;
let err;
let payload;
/* eslint no-underscore-dangle: 0, prefer-destructuring: 0, radix: 0, no-return-assign: 0, no-restricted-globals: 0, max-len: 0 */
export class BaseMiddlewareBase {
  partyMembersOnly = async (req, res, next) => {
    user = await this.__decodeToken(req.headers.authorization);
    if (!user || user.role > 1) {
      err = new Error('Sorry you are not authorized to do this');
      err.status = 401;
      return next(err);
    }
    next();
  }

  adminMembersOnly = async (req, res, next) => {
    user = await this.__decodeToken(req.headers.authorization);
    if (!user || user.role > 3) {
      err = new Error('Sorry you are not authorized to do this');
      err.status = 401;
      return next(err);
    }
    next();
  }

  __ensureUser = async (req, res, next) => {
    payload = await this.__decodeToken(req.headers.authorization);
    req.user = payload;
    next();
  }

  __ensureAuthorization = (req, res, next) => {
    if (!res.headers.authorization) {
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


  __decodeToken = async (token) => {
    data = await jwt.verify(token, 'Thisshouldbeasecretkey');
    return data;
  }
}

const BaseMiddleware = new BaseMiddlewareBase();
export default BaseMiddleware;
