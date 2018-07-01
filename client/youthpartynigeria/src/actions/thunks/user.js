import axios from 'axios';
import { AsyncStorage } from 'react-native'
import config from '../../config/';
import { navigatorObject } from '../../navigation/';
import configureStore from '../../store';

const { store } = configureStore();
/* eslint arrow-parens: 0 */
const SignUpThunk = (body) => (navigator) => (dispatch) => {
  dispatch({ type: 'PROCESSING_CONTENT' });
  return axios.post(`${config.baseUrl}/signup`, body)
        .then((response) => {
        // dispatch to the central state;
        dispatch({ type: 'USER_SIGNUP', payload: response.data.data.user })
        // cache the data;
        navigatorObject.startLoggedIn();
        })
        .then((response) => {
          AsyncStorage.setItem("#!@#$%", response.data.data.token);
        })
        .catch((err) => {
          // console the error for now
          console.log(err.response.data.errors);
          // navigator.showInAppNotification({
          //   screen: 'app.NotificationScreen',
          //   passProps: {
          //     error: err.response.data.error
          //   }
          // });
        });
}


const LogInThunk = (body) => (navigator) => (dispatch) => {
  // render an activity indicator here
  dispatch({ type: 'PROCESSING_CONTENT' });
  return axios.post(`${config.baseUrl}/login`, body)
        .then((response) => {
        // dispatch to the central state;
        dispatch({ type: 'USER_LOGGED_IN', payload: response.data.data.user })
        // cache the data;
        navigatorObject.startLoggedIn();
        })
        .then((response) => {
          AsyncStorage.setItem("#!@#$%", response.data.data.token);
        })
        .catch((err) => {
          // console the error for now
          console.log(err.response.data.errors);
          // navigator.showInAppNotification({
          //   screen: 'app.NotificationScreen',
          //   passProps: {
          //     error: err.response.data.error
          //   }
          // });
        });
}

export default { SignUpThunk, LogInThunk  }
