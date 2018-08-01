import axios from 'axios';
import { dispatchNotification, StartProcess, EndProcess } from '../../helpers/uploader';
import config from '../../config';

export const fetchAllEvents = navigator => (dispatch, getState) => {
  StartProcess(navigator);
  return axios.request({
    method: 'get',
    url: `${config.postUrl}/events/?timestamp=${Date.now()}`,
    headers: {
      Authorization: getState().users.token,
      'Cache-Control': 'no-cache'
    }
  })
    .then((response) => {
      EndProcess(navigator);
      console.log(response.data)
      dispatch({ type: 'ALL_EVENTS_GOTTEN', payload: response.data.data });
    })
    .catch(() => {
      dispatchNotification(navigator)('Something went wrong. Sorry.');
      navigator.pop();
    });
};


export const fetchSpecificEvent = id => navigator => (dispatch, getState) => {
  StartProcess(navigator);
  return axios
    .request({
      method: 'get',
      url: `${config.postUrl}/events/${id}`,
      headers: {
        Authorization: getState().users.token
      }
    })
    .then((response) => {
      dispatch({ type: 'SPECIFIC_EVENT_GOTTEN', payload: response.data.data });
      EndProcess(navigator);
      navigator.push({
        screen: 'Show.Event',
        title: response.data.data.name
      });
    })
    .catch((err) => {
      EndProcess(navigator);
      dispatchNotification(navigator)('Something went wrong fetching that event');
    });
};


export const fetchEventsForUser = id => (_, getState) => axios
  .request({
    method: 'get',
    url: `${config.postUrl}/events/user/${id}`,
    headers: {
      Authorization: getState().users.token
    }
  })
  .then(response => response.data.data)
  .catch((err) => {
    return [];
  });


export const attendEvent = id => navigator => (_, getState) => {
  StartProcess(navigator);
  return axios.request({
    method: 'put',
    url: `${config.postUrl}/events/join/${id}`,
    headers: {
      Authorization: getState().users.token
    }
  })
    .then(() => {
      EndProcess(navigator);
      dispatchNotification(navigator)('Successfully booked a place. Thank you!');
      navigator.pop();
    })
    .catch((err) => {
      EndProcess(navigator);
      if (err.response && err.response.status) {
        dispatchNotification("You're attending this event already. Thank you!");
        return navigator.pop();
      }
      dispatchNotification('Something went wrong. Try again?');
      return navigator.pop();
    });
};

export const leaveEvent = id => navigator => (_, getState) => {
  StartProcess(navigator);
  return axios.request({
    method: 'put',
    url: `${config.postUrl}/events/leave/${id}`,
    headers: {
      Authorization: getState().users.token
    }
  })
    .then(() => {
      EndProcess(navigator);
      dispatchNotification(navigator)('Okay great done');
      navigator.pop();
    })
    .catch(() => {
      EndProcess(navigator);
      dispatchNotification('Something went wrong. Try again?');
      return navigator.pop();
    });
};
