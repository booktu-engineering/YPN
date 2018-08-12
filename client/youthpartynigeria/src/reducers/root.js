import { combineReducers } from 'redux';
import users from './users';
import posts from './posts';
import convos from './conversations';
import donations from './donations';
import questions from './questions';
import events from './events';
import careers from './careers'

const root = combineReducers({
  users,
  posts,
  convos,
  donations,
  questions,
  events, 
  careers
});

export default root;
