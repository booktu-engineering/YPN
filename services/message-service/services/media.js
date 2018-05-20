import BaseService from './base';
import MediaModel from '../models/media';

class MediaServiceBase extends BaseService {}

const MediaService = new MediaServiceBase(MediaModel);

export default MediaService;
