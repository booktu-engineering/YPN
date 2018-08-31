import { combineReducers } from 'redux';
import users from './users';
import posts from './posts';
import convos from './conversations';

const root = combineReducers({
  users,
  posts,
  convos
});

export default root;
