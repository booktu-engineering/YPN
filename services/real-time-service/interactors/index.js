import PostService from './internal/exec';

const dispatchToDb = (data) => {
  const arr = [PostService.internalCreate, PostService.externalCreate]
  const index = Math.floor(Math.random() * 1)
  return arr[index](data);
}

export default dispatchToDb;
