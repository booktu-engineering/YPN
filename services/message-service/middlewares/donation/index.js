import DonationModel from '../../models/donation';
import { BaseMiddlewareBase } from '../base';

class DonationMiddlewareBase extends BaseMiddlewareBase {
  validate = (req, res, next) => {
    req.body.valid = true;
    next();
  }

  revokeDonation = (req, res, next) => {
    if (req.body.referenceID && req.body.date && req.body.user && req.body.amount) return next();
    const err = new Error('This donation is invalid, The referenceID, date & origin are required');
    err.status = 403;
    next(err);
  }
}

const DonationMiddleware = new DonationMiddlewareBase(DonationModel);

export default DonationMiddleware;
