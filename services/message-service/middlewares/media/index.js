import { BaseMiddlewareBase } from '../base';
import MediaModel from '../../models/media';

class MediaMiddlewareB extends BaseMiddlewareBase {

}

const MediaMiddleware = new MediaMiddlewareB(MediaModel);

export default MediaMiddleware;
