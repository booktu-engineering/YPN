import BaseService from './base';
import Donation from '../models/donation';

let data;
/* eslint max-len: 0, prefer-const: 0, no-underscore-dangle: 0, no-return-await: 0 */
class DonationServiceBase extends BaseService {
    donate = async (body) => {
      this.__sanitizeInput(body);
      data = await this.model.findById(body.id);
      if (data) {
        data.amount += body.amount;
        data.references.push(body);
        return await data.save();
      }
      this.__notFoundError('Sorry we couldnt find any donation like that');
    }

    __sanitizeInput = (body) => {
      if (!body || !body.id || body.constructor !== Object || !body.amount || body.amount.constructor !== Number || !body.referenceID || !body.date || body.date.constructor === Date || !body.user || body.user.constructor !== Object || !body.user.name) {
        let e = new Error('Sorry thats an invalid donation');
        e.status = 422;
        throw e;
      }
    };

    fetchOneSync = async (key, value) => {
      data = await this.fetchOne(key, value);
      data = { ...data, status: data.getStatus() };
      return data;
    }
}

const DonationService = new DonationServiceBase(Donation);
export default DonationService;
