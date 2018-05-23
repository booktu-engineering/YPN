import EventModel from '../../models/event'
import { BaseMiddlewareBase } from '../base';

class EventMiddlewareBase extends BaseMiddlewareBase {

}

const EventMiddleware = new EventMiddlewareBase(EventModel);

export default EventMiddleware
