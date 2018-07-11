import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers/root';

export default () => {
  const store = createStore(rootReducer, applyMiddleware(
    thunkMiddleware
  ));
  return {
    store,
    Provider
  };
};
