import ConversationService from '../../services/conversation-service';
import BaseController from '../base';

/* eslint no-underscore-dangle: 0 */
let data;
class ConversationControllerBase extends BaseController {

  create = (req, res, next) => {
    this.__wrapInTryCatch(async () => {
      req.body.members.push(req.user);
      data = await this.service.create(req.body);
      this.__resourceCreated(res, data);
    }, next);
  }

  extendInvite = (req, res, next) => {
    this.__wrapInTryCatch(async () => {
      data = await this.service.extendInvite('_id', req.params.id, req.body);
      this.__responseOkay(res, data);
    }, next);
  }

}

const ConversationController = new ConversationControllerBase(ConversationService);
export default ConversationController;
