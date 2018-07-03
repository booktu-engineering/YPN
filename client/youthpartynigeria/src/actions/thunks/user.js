import axios from 'axios';
import { AsyncStorage } from 'react-native'
import config from '../../config/';
import { navigatorObject } from '../../navigation/';
import configureStore from '../../store';
import { dispatchNotification } from '../../helpers/uploader';


/* eslint arrow-parens: 0 */
const SignUpThunk = (body) => (navigator) => (dispatch) => {
  dispatch({ type: 'PROCESSING_CONTENT' });
  return axios.post(`${config.baseUrl}/signup`, body)
    .then((response) => {
      AsyncStorage.setItem("#!@#$%", response.data.data.token);
    })
    .then((response) => {
      dispatch({ type: 'USER_SIGN_UP', payload: response.data.data.user })
      navigatorObject.startLoggedIn();
    })
    .catch((err) => {
       // console the error for now
          navigator.showInAppNotification({
            screen: 'App.notification',
            passProps: {
              message: err.response.data.errors
            }
          });
      });
}


const LogInThunk = (body) => (navigator) => (dispatch) => {
  // render an activity indicator here
  dispatch({ type: 'PROCESSING_CONTENT' });
  return axios.post(`${config.baseUrl}/login`, body)
    .then((response) => {
      dispatch({ type: 'USER_LOGGED_IN', payload: response.data.data.user })
      // cache the token - and move after then
      AsyncStorage.setItem("#!@#$%", response.data.data.token)
        .then(() => {
          navigatorObject.startLoggedIn();
          dispatchNotification(navigator)(`Welcome back! ${response.data.data.user.firstname}`)
        })})
    .catch((err) => {
          dispatchNotification(navigator)(err.response.data.errors);
      });
}

export default { SignUpThunk, LogInThunk  }
