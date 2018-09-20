import PostService from './internal/exec';
import Post from './internal/model';

const dispatchToDb = (data) => (io) => {
  // const arr = [PostService.internalCreate, PostService.externalCreate];
  // const index = Math.floor(Math.random() * 1); 
  return PostService.internalCreate(data)(io);
};

export default dispatchToDb;
