import axios from 'axios';
import { AsyncStorage } from 'react-native';
import config from '../../config';
import { navigatorObject } from '../../navigation';
import { dispatchNotification, StartProcess, EndProcess } from '../../helpers/uploader';
import { fetchUsersPosts } from './posts';

/* eslint arrow-parens: 0 */
const SignUpThunk = (body) => (navigator) => (dispatch) => {
  StartProcess(navigator);
  dispatch({ type: 'PROCESSING_CONTENT' });
  return axios.post(`${config.baseUrl}/signup`, { ...body })
    .then((response) => {
      dispatch({ type: 'USER_SIGN_UP', payload: response.data.data.user });
      dispatch({ type: 'INSERT_TOKEN', payload: response.data.data.token });
      AsyncStorage.setItem('#!@#$%', response.data.data.token);
      AsyncStorage.setItem('#!@#$%ID', response.data.data.user.id.toString())
        .then(() => {
          navigatorObject.registerOtherScreens();
          navigatorObject.startLoggedIn();
          dispatchNotification(navigator)(`Welcome to YPN! ${response.data.data.user.firstname}`);
        });
    })
    .catch((err) => {
      EndProcess(navigator);
      navigator.showInAppNotification({
        screen: 'App.notification',
        passProps: {
          message: err.response ? err.response.data.errors : 'Something went terribly wrong. try again?'
        }
      });
    });
};

export const UpdateUserInfo = newUserInfo => (navigator) => (dispatch, getState) => {
  axios
    .request({
      method: 'put',
      url: `${config.baseUrl}/user`,
      data: {
        user: newUserInfo
      },
      headers: {
        Authorization: getState().users.token
      }
    })
    .then((response) => {
      EndProcess(navigator);
      dispatch({ type: 'INSERT_TOKEN', payload: response.data.token });
      dispatch({ type: 'USER_LOGGED_IN', payload: response.data.data });
      navigator.pop();
    })
    .catch((err) => {
      EndProcess(navigator);
      dispatchNotification(navigator)('Sorry, something went wrong');
      navigator.pop();
    });
};

export const fetchFollowersForUser = (navigator, key) => (dispatch, getState) =>  {
  if(key){
    StartProcess(navigator)
  }
  return axios.request({
    method: 'get',
    url: `${config.baseUrl}/users/`,
    headers: {
      Authorization: getState().users.token
    }
  }).then((response) => {
    EndProcess(navigator)
    navigator.showModal({
      screen: 'Follow.User',
      passProps: {
        data: response.data.data
      }
    });
  })
    .catch((err) => {
      EndProcess(navigator)
      dispatchNotification(navigator)("We tried to get you some friends. Didn't work out. Try again?");
      navigator.pop();
    });
}


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


export const followUser = (data) => (navigator) => (dispatch, getState) => {
  StartProcess(navigator);
  axios.request({
    method: 'post',
    url: `${config.baseUrl}/follow/${data.id}`,
    headers: {
      Authorization: getState().users.token
    }
  }).then(() => {
    EndProcess(navigator);
    dispatchNotification(navigator)(`Awesome, You have just followed ${data.firstname}`);
  })
    .catch(() => {
      EndProcess(navigator);
      dispatchNotification(navigator)(`Awesome, You have just followed ${data.firstname}`);
    });
};


const LogInThunk = (body) => (navigator) => (dispatch) => {
  // render an activity indicator here
  StartProcess(navigator);
  return axios.post(`${config.baseUrl}/login`, body)
    .then((response) => {
      dispatch({ type: 'USER_LOGGED_IN', payload: response.data.data.user });
      dispatch({ type: 'INSERT_TOKEN', payload: response.data.data.token });
      // cache the token - and move after then
      AsyncStorage.setItem('#!@#$%', response.data.data.token);
      AsyncStorage.setItem('#!@#$%ID', response.data.data.user.id.toString())
        .then(() => {
          dispatchNotification(navigator)(`Welcome back! ${response.data.data.user.firstname}`);
          navigatorObject.registerOtherScreens();
          navigatorObject.startLoggedIn();
          dispatch(fetchAllRelationshipsOfUser());
        });
    })
    .catch((err) => {
      EndProcess(navigator);
      const error = err.response ? err.response.data.errors : 'Something went wrong, try again?';
      dispatchNotification(navigator)(error);
    });
};


export const fetchUserThunk = (id) => (navigator) => async (dispatch) => {
  StartProcess(navigator);
  const token = await AsyncStorage.getItem('#!@#$%');
  axios.request({
    method: 'get',
    url: `${config.baseUrl}/profile/${id}`,
    headers: {
      Authorization: token
    }
  })
    .then((response) => {
      // dispatch({
      //   type: 'FETCHED_USER',
      //   payload: {
      //     ...response.data.data,
      //     followers: response.data.followers,
      //     friends: response.data.friends
      //   }
      // });
      navigator.push({
        screen: 'Show.User',
        passProps: {
          id,
          target: {
            ...response.data.data,
            followers: response.data.followers,
            friends: response.data.friends

          }
        }
      });
      EndProcess(navigator);
      dispatch(fetchUsersPosts(response.data.data));
    })
    .catch((err) => {
      EndProcess(navigator);
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
  StartProcess(navigator);
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
      EndProcess(navigator);
      dispatchNotification(navigator)(`Nice. You have just followed ${target.firstname}`);
    })
    .catch((err) => {
      EndProcess(navigator);
      dispatchNotification(navigator)("Something went wrong and we couldn't complete that action.");
    });
};

export const newPartyMember = (navigator) => (dispatch, getState) => axios.request({
  method: 'get',
  url: `${config.baseUrl}/party/member/new/${getState().users.current.id}`,
  headers: {
    Authorization: getState().users.token
  }
}).then(() => {
  EndProcess(navigator);
  dispatchNotification(navigator)(`Welcome to Youth Party! ${getState().users.current.firstname}`);
  // you're doing this so you can update the store as well;
  dispatch(UpdateUserInfo({ role: 1 })(navigator));
})
  .catch(() => {
    EndProcess(navigator);
    dispatchNotification(navigator)(`Something went wrong. Are you a party member already, ${getState().users.current.firstname}?`);
    navigator.pop();
  });

export default { SignUpThunk, LogInThunk };
