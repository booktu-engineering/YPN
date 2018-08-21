import axios from 'axios';
import { AsyncStorage } from 'react-native';
import config from '../../config/';
import { dispatchNotification, StartProcess, EndProcess } from '../../helpers/uploader';
import configureStore from '../../store';

const { store } = configureStore();
/* eslint max-len:0 */
export const fetchAllConversations = navigator => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem('#!@#$%');
    return axios.request({
      url: `${config.postUrl}/convos/`,
      method: 'get',
      headers: {
        Authorization: token
      }
    })
      .then((response) => {
        // doing this to know what is happening
        dispatch({ type: 'ALL_CONVERSATIONS_RECEIVED', payload: response.data.data });
        // create a registry
        const registry = response.data.data.reduce((a, b) => {
          a[`${b._id}`] = b.messages || [];
          return a;
        }, {});
        const activitymap = response.data.data.reduce((a, b) => {
          a[`${b._id}`] = 0;
          return a;
        }, {});
        dispatch({ type: 'CREATE_REGISTRY', payload: registry });
        dispatch({ type: 'CREATE_ACTIVITY_MAP', payload: activitymap });
      })
      .catch((error) => {
        dispatchNotification(navigator)('Something went wrong');
      });
  } catch (error) {
    dispatchNotification(navigator)(error.response.data.error);
  }
};

export const startPersonalConversation = users => navigator => async (dispatch, getState) => {
  StartProcess(navigator);
  // you want to check that the message already exists in state
  let target;
  const targets = users.map(item => item.id);
  targets.push(getState().users.current.id);
  const messages = getState().convos.logs;
  if (!messages || !messages.length) return await createNewConversation(users)(navigator)(dispatch);
  // you want to make sure the members are in the array;
  let filtered = messages.filter(item => item.type === 1 && item.members.length === targets.length);
  if (!filtered.length) return await createNewConversation(users, reference)(navigator)(dispatch);
  // return the item
  filtered = filtered.map((item) => {
    // concat & dedupe to check for unique guys
    item.members = item.members.map(member => member.id).concat(targets);
    item.members = item.members.filter((el, i, arr) => arr.indexOf(el) === i);
    if (item.members.length === targets.length) {
      target = item;
    }
    return item;
  });
  // dispatch the conversation;
  if (target) {
    target.members = users;
    EndProcess(navigator);
    return navigator.push({ screen: 'Convo.Log', passProps: { data: target } });
  }
  return await createNewConversation(users, reference)(navigator)(dispatch);
};

export const createNewConversation = (members, reference) => navigator => async (dispatch) => {
  const token = await AsyncStorage.getItem('#!@#$%');
  axios.request({
    method: 'post',
    url: `${config.postUrl}/convos/?type=1`,
    data: { members },
    headers: {
      Authorization: token
    }
  }).then((response) => {
    dispatch({ type: 'CONVERSATION_RECEIVED', payload: response.data.data });
    EndProcess(navigator);
    return navigator.push({ screen: 'Convo.Log', passProps: { target: response.data.data, reference } });
  })
    .catch((err) => {
      EndProcess(navigator);
      dispatchNotification(navigator)('Awesome then, check your logs!');
      navigator.pop();
    });
};


export const updateConversation = id => navigator => (dispatch, getState) => axios.request({
  method: 'get',
  url: `${config.postUrl}/convos/${id}`,
  headers: {
    Authorization: getState().users.token
  }
})
  .then((response) => {
    dispatch({ type: 'CONVERSATION_RECEIVED', payload: response.data.data });
    return response.data.data.messages;
  })
  .catch(() => {
    dispatchNotification(navigator)('Something went wrong, couldnt fetch the messages');
  });

export const fetchConversation = target => (dispatch, getState) => getState().convos.registry[`${target.destination}`] || [];

export const incomingMessage = data => (dispatch, getState) => {
  // data is the new message object
  const { registry } = getState().convos;
  const { activityMap } = getState().convos;
  registry[`${data.destination}`] = [data, ...registry[`${data.destination}`]];
  activityMap[`${data.destination}`] += 1;
  dispatch({ type: 'UPDATE_REGISTRY', payload: registry });
  dispatch({ type: 'UPDATE_ACTIVITY', payload: activityMap });
};

export const JoinConversation = data => navigator => (dispatch, getState) => {
  // this assumes that the fella is joining a conversation like debate and all of dat
  StartProcess(navigator);
  return axios.request({
    method: 'put',
    url: `${config.postUrl}/convos/join/${data._id}`,
    headers: {
      Authorization: getState().users.token
    }
  }).then((response) => {
    dispatch({ type: 'CONVERSATION_RECEIVED', payload: response.data.data });
    EndProcess(navigator);
    navigator.push({ screen: 'Convo.Log', passProps: { data: response.data.data } });
  })
    .catch((err) => {
      // remember to remove this when the app goes into production
      if (err.response.status && err.response.status === 401) {
      
        EndProcess(navigator);
        dispatchNotification(navigator)('You do not have permissions to join this conversation');
        return navigator.pop();
      }
      if (err.response && err.response.status === 409) {
        EndProcess(navigator);
        return navigator.push({ screen: 'Convo.Log', passProps: { data } });
        // return navigator.switchToTab({ tabIndex: 1 });
      }
      EndProcess(navigator);
      dispatchNotification(navigator)('Something went wrong, try again?');
      return navigator.pop();
    });
};

export const fetchConversations = (type, navigator, callback) => (dispatch, getState) => {
  StartProcess(navigator);
  return axios.request({
    method: 'get',
    url: `${config.postUrl}/convos/type/${type}`,
    headers: {
      Authorization: getState().users.token
    }
  })
    .then((response) => {
      EndProcess(navigator);
      if (callback) return callback(response.data.data);
      dispatch({ type: 'SPECIFIC_CONVERSATIONS_GOTTEN', payload: response.data.data });
    })
    .catch(() => {
      EndProcess(navigator);
      dispatchNotification(navigator)('Something went wrong, try again?');
      navigator.pop();
    });
};

export const LeaveConversation = id => navigator => async (dispatch) => {
  // optimiscally remove the target from state;
  let current = store.getState().convos.logs;
  current = current.filter(item => item.id !== id);
  dispatch({ type: 'ALL_CONVERSATIONS_RECEIVED', payload: current });
  const token = await AsyncStorage.getItem('#!@#$%');
  return axios.request({
    method: 'put',
    url: `${config.postUrl}/convos/leave/${id}`,
    headers: {
      Authorization: token
    }
  }).then(() => {
    // success he/she has left the conversation
    dispatchNotification(navigator)('Conversation Left. Thanks for nothing.');
  }).catch(() => {
    dispatchNotification(navigator)('Sorry, something went wrong. Try again?');
  });
};

export const sendMessage = (body, socket) => navigator => (dispatch, getState) => {
  // there has to be type and destination
  if (!body.type && !body.destination) return dispatchNotification(navigator)('Sorry, you need to send in the right message');
  dispatch(incomingMessage(body));
  // add the origin, since it might be saved to the db directly
  body.origin = getState().users.current;
  return socket.emit('new-message', body);
};
