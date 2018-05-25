import BaseController from '../base';
import DonationService from '../../services/donation';
/* eslint-disable no-underscore-dangle */
let data;
class DonationControllerBase extends BaseController {

  donate = (req, res, next) => {
    this.__wrapInTryCatch(async () => {
      data = await this.service.donate({ ...req.body, id: req.params.id });
      this.__responseOkay(res, data);
    }, next);
  }

  fetchOne = (req, res, next) => {
    this.__wrapInTryCatch(async () => {
      data = await this.service.fetchOneSync('_id', req.params.id);
      this.__responseOkay(res, data);
    }, next);
  }

  deleteOne = (req, res, next) => {
    this.__wrapInTryCatch(async () => {
      data = await this.service.archiveOne('_id', req.params.id);
      this.__responseOkay(res, data);
    }, next);
  }
}

const DonationController = new DonationControllerBase(DonationService);

export default DonationController;
