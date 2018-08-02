import axios from 'axios';
import { AsyncStorage } from 'react-native';
import config from '../../config';
import { dispatchNotification, StartProcess, EndProcess } from '../../helpers/uploader';
import { fetchFollowersForUser } from './user';

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
        dispatch({ type: 'TIMELINE_GOTTEN', payload: response.data.data });
        if (!response.data.data.length) return dispatch(fetchFollowersForUser(navigator));
      })
      .catch((err) => {
        dispatchNotification(navigator)(err.response.data.error);
      });
  } catch (err) {
    dispatchNotification(navigator)(err.message);
  }
};

export const sendPost = data => navigator => async (dispatch, getState) => {
  // dispatch processing job
  StartProcess(navigator);
  return axios.request({
    method: 'post',
    data,
    url: `${config.postUrl}/posts`,
    headers: {
      Authorization: getState().users.token
    }
  }).then(() => {
    EndProcess(navigator);
    navigator.switchToTab({
      tabIndex: 0
    });
  })
    .catch(() => {
      EndProcess(navigator);
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
    return response.data.data;
  })
    .catch((err) => {
    });
};

// passing key of 0 means liking the post, passing a key of 1 means unliking the post
export const LikePost = id => key => async (_, getState) => axios
  .request({
    method: 'put',
    url: `${config.postUrl}/posts/like/${id}?type=${key}`,
    headers: {
      Authorization: getState().users.token
    }
  })
  .then(() => {
    // You can do whatever you want here
  })
  .catch(() => {
  });

export const fetchSinglePost = id => axios
  .request({
    url: `${config.postUrl}/posts/${id}`,
    method: 'get',
  })
  .then(response => response.data.data)
  .catch((err) => {
    console.log(err);
  })

export const replyToPost = data => navigator => (dispatch, getState) => {
  // ensure that the data has the reference object and ID
  // the post looks like this { type: 1, content: 'Some content', referenceID;  }
  if (!data.referenceID || !data.referenceObject) throw new Error('Please send in the right reference');
  return sendPost(data)(navigator)(dispatch, getState);
}
