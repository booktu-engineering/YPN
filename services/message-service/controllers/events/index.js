import BaseController from '../base'
import EventService from '../../services/event';

let data;
/* eslint no-underscore-dangle: 0, radix: 0 */
class EventControllerBase extends BaseController {
  confirm = (req, res, next) => {
    this.__wrapInTryCatch(async () => {
      data = await this.service.updateOne('_id', req.params.id, { valid: true });
      this.__responseOkay(res, data);
    }, next);
  }

  fetchEventsForUser = (req, res, next) => {
    this.__wrapInTryCatch(async () => {
      data = await this.service.fetchEventsForUser(parseInt(req.params.id));
      this.__responseOkay(res, data);
    }, next);
  }

  deleteOne = (req, res, next) => {
    this.__wrapInTryCatch(async () => {
      data = await this.service.archiveOne('_id', req.params.id);
      this.__responseOkay(res, data);
    }, next);
  }

  fetchAll = (req, res, next) => {
    this.__wrapInTryCatch(async () => {
      data = await this.service.fetchAll();
      if (req.user.role > 3) return this.__responseOkay(res, data);
      data = data.filter(item => !item.archived);
      return this.__responseOkay(res, data);
    }, next);
  }

}

const EventController = new EventControllerBase(EventService);
export default EventController
