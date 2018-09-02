import PostService from './internal/exec';
import Post from './internal/model';

const dispatchToDb = (data) => {
  // const arr = [PostService.internalCreate, PostService.externalCreate];
  // const index = Math.floor(Math.random() * 1); 
  return PostService.internalCreate(data);
};

export default dispatchToDb;
