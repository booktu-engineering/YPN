import axios from 'axios';
import { AsyncStorage } from 'react-native';
import config from '../../config';
import { dispatchNotification } from '../../helpers/uploader';

export const fetchTimeline = navigator => async (dispatch) => {
  try {
  // first thing you want to do is to get the token
    const token = await AsyncStorage.getItem('#!@#$%');
    return axios.request({
      url: `${config.postUrl}/posts`,
      method: 'get',
      headers: {
        Authorization: token
      }
    })
      .then((response) => {
        console.log(response.data);
        dispatch({
          type: 'TIMELINE_GOTTEN',
          payload: response.data.data
        });
      })
      .catch((err) => {
        dispatchNotification(navigator)(err.response.data.error);
      });
  } catch (err) {
    console.log(err);
    dispatchNotification(navigator)(err.message);
  }
};

export const sendPost = data => navigator => async (dispatch) => {
  // dispatch processing job
  const token = await AsyncStorage.getItem('#!@#$%');
  return axios.request({
    method: 'post',
    data,
    url: `${config.postUrl}/posts`,
    headers: {
      Authorization: token
    }
  }).then((response) => {
    console.log(response);
    navigator.switchToTab({
      tabIndex: 0
    });
  })
    .catch((err) => {
      if (err.message) return console.log(err.message);
      console.log(err.response.data);
    });
};

export const fetchUsersPosts = target => async (dispatch) => {
  const token = await AsyncStorage.getItem('#!@#$%');
  return axios.request({
    method: 'get',
    url: `${config.postUrl}/posts/all/${target.id}`,
    headers: {
      Authorization: token
    }
  }).then((response) => {
    dispatch({
      type: 'TARGET_POSTS_GOTTEN',
      payload: response.data.data
    });
  })
    .catch((err) => {
      console.log(err);
    });
};
