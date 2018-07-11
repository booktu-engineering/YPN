import axios from 'axios';
import { AsyncStorage } from 'react-native';
import config from '../../config/';
import { navigatorObject } from '../../navigation/';
import { dispatchNotification } from '../../helpers/uploader';
import { fetchUsersPosts } from './posts';

/* eslint arrow-parens: 0 */
const SignUpThunk = (body) => (navigator) => (dispatch) => {
  dispatch({ type: 'PROCESSING_CONTENT' });
  return axios.post(`${config.baseUrl}/signup`, body)
    .then((response) => {
      dispatch({ type: 'USER_SIGN_UP', payload: response.data.data.user });
      dispatch({ type: 'INSERT_TOKEN', payload: response.data.data.token });
      AsyncStorage.setItem('#!@#$%', response.data.data.token)
        .then(() => {
          navigatorObject.startLoggedIn();
          dispatchNotification(navigator)(`Welcome to YPN! ${response.data.data.user.firstname}`);
        });
    })
    .catch((err) => {
      navigator.showInAppNotification({
        screen: 'App.notification',
        passProps: {
          message: err.response ? err.response.data.errors : 'Oops, something went terribly wrong. try again?'
        }
      });
    });
};


export const fetchFollowersForUser = (navigator) => (dispatch, getState) => axios.request({
  method: 'get',
  url: `${config.baseUrl}/users/`,
  headers: {
    Authorization: getState().users.token
  }
}).then((response) => {
  navigator.showModal({
    screen: 'Follow.User',
    passProps: {
      data: response.data.data
    }
  });
})
  .catch((err) => {
    dispatchNotification(navigator)("We tried to get you some friends. Didn't work out. Try again?");
    navigator.pop();
  });


export const fetchAllRelationshipsOfUser = () => (dispatch, getState) => axios.request({
  method: 'get',
  url: `${config.baseUrl}/profile/${getState().users.current.id}`,
  headers: {
    Authorization: getState().users.token
  }
})
  .then((response) => {
    dispatch({ type: 'FETCHED_ALL_RELATIONSHIPS', payload: { friends: response.data.friends, followers: response.data.followers } });
  })
  .catch((err) => {
    console.log(err);
  });


export const followUser = (data) => (navigator) => (dispatch, getState) => axios.request({
  method: 'post',
  url: `${config.baseUrl}/follow/${data.id}`,
  headers: {
    Authorization: getState().users.token
  }
}).then((response) => {
  dispatchNotification(navigator)(`Awesome, You have just followed ${data.firstname}`);
})
  .catch((response) => {
    dispatchNotification(navigator)(`Awesome, You have just followed ${data.firstname}`);
  });

const LogInThunk = (body) => (navigator) => (dispatch) => {
  // render an activity indicator here
  dispatch({ type: 'PROCESSING_CONTENT' });
  return axios.post(`${config.baseUrl}/login`, body)
    .then((response) => {
      dispatch({ type: 'USER_LOGGED_IN', payload: response.data.data.user });
      dispatch({ type: 'INSERT_TOKEN', payload: response.data.data.token });
      // cache the token - and move after then
      AsyncStorage.setItem('#!@#$%', response.data.data.token)
        .then(() => {
          dispatchNotification(navigator)(`Welcome back! ${response.data.data.user.firstname}`);
          navigatorObject.startLoggedIn();
          dispatch(fetchAllRelationshipsOfUser());
        });
    })
    .catch((err) => {
      const error = err.response ? err.response.data.errors : 'Hey, something went wrong, try again?';
      dispatchNotification(navigator)(error);
    });
};


export const fetchUserThunk = (id) => (navigator) => async (dispatch) => {
  const token = await AsyncStorage.getItem('#!@#$%');
  axios.request({
    method: 'get',
    url: `${config.baseUrl}/profile/${id}`,
    headers: {
      Authorization: token
    }
  })
    .then((response) => {
      dispatch({
        type: 'FETCHED_USER',
        payload: {
          ...response.data.data,
          followers: response.data.followers,
          friends: response.data.friends
        }
      });
      navigator.push({
        screen: 'Show.User',
        passProps: {
          id
        }
      });
      dispatch(fetchUsersPosts(response.data.data));
    })
    .catch((err) => {
      dispatchNotification(navigator)('Sorry we couldnt get the user requested');
    });
};

export const updateUser = async (id, navigator) => {
  const token = await AsyncStorage.getItem('#!@#$%');
  return axios.request({
    method: 'get',
    url: `${config.baseUrl}/profile/${id}`,
    headers: {
      Authorization: token
    }
  })
    .then((response) => ({ ...response.data.data, followers: response.data.followers, friends: response.data.friends })).catch((err) => {
      dispatchNotification(navigator)('Sorry, something went wrong');
      navigator.pop();
    });
};

export const followUserThunk = (target) => (navigator) => async () => {
  const token = await AsyncStorage.getItem('#!@#$%');
  return axios.request({
    method: 'post',
    url: `${config.baseUrl}/follow/${target.id}`,
    headers: {
      Authorization: token
    }
  })
    .then(() => {
      // this will only run if 201
      dispatchNotification(navigator)(`Nice. You have just followed ${target.firstname}`);
    })
    .catch((err) => {
      console.log(err);
      dispatchNotification(navigator)("Oops, something went wrong and we couldn't complete that action.");
    });
};

export default { SignUpThunk, LogInThunk };
