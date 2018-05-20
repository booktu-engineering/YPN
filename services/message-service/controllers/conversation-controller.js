import ConversationService from '../services/conversation-service';
import BaseController from './base';

let data;
/* eslint no-underscore-dangle: 0 */
class ConversationControllerBase extends BaseController {

  getTimeLine = (req, res, next) => {
    this.__wrapInTryCatch(async () => {
      data = this.service.getTimeline(req.body);
      this.__responseOkay(res, data);
    }, next);
  }
}

const ConversationController = new ConversationControllerBase(ConversationService);
export default ConversationController;
