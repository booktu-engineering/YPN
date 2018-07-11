import { combineReducers } from 'redux';
import users from './users';
import posts from './posts';
import convos from './conversations';
import donations from './donations';

const root = combineReducers({
  users,
  posts,
  convos,
  donations
});

export default root;
