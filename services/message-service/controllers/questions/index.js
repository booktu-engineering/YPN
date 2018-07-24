import BaseController from '../base';
import QuestionService from '../../services/election';

let data;
/* eslint no-underscore-dangle: 0 */
class ConversationControllerBase extends BaseController {
  create = (req, res, next) => {
    this.__wrapInTryCatch(async () => {
      data = await this.service.createSync(req.body);
      this.__resourceCreated(res, data);
    }, next);
  }

  respond = (req, res, next) => {
    this.__wrapInTryCatch(async () => {
      data = await this.service.respond(req.body);
      this.__responseOkay(res, data);
    }, next);
  }

  fetchResults = (req, res, next) => {
    this.__wrapInTryCatch(async () => {
      data = await this.service.fetchResults('_id', req.params.id);
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

  deleteOne = (req, res, next) => {
    this.__wrapInTryCatch(async () => {
      data = await this.service.archiveOne('_id', req.params.id);
      this.__responseOkay(res, data);
    }, next);
  }
}

const ConversationController = new ConversationControllerBase(QuestionService);

export default ConversationController;
