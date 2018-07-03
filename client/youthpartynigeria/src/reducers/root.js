import { combineReducers } from 'redux';
import users from './users';
import posts from './posts';

const root = combineReducers({
  users,
  posts
})

export default root;
