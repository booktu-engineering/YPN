import axios from 'axios';
import { AsyncStorage } from 'react-native';
import config from '../../config';
import { dispatchNotification } from '../../helpers/uploader';

export const fetchTimeline = (navigator) => async (dispatch) => {
  try {
  // first thing you want to do is to get the token
  const token = await AsyncStorage.getItem("#!@#$%");
  return axios.request({
    url: `${config.postUrl}/posts`,
    method: 'get',
    headers: {
      'Authorization': token
    }})
    .then((response) => {
      console.log(response);
      dispatch({
        type: 'TIMELINE_GOTTEN',
        payload: response.data.data
      })
    })
    .catch((err) => {
      dispatchNotification(navigator)(err.response.data.error);
    })
  } catch (err) {
    console.log(err);
    dispatchNotification(navigator)(err.message)
  }
}

export const DOthis = {};
