import { combineReducers } from 'redux';
import users from './users';
import posts from './posts';
import convos from './conversations';
import donations from './donations';
import questions from './questions';

const root = combineReducers({
  users,
  posts,
  convos,
  donations,
  questions
});

export default root;
