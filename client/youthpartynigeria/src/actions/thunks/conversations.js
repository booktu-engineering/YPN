import axios from 'axios';
import { AsyncStorage } from 'react-native';
import config from '../../config/';
import { dispatchNotification } from '../../helpers/uploader';
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
          a[`${b._id}`] = b.messages;
          return a;
        }, {});
        dispatch({ type: 'CREATE_REGISTRY', registry });
      })
      .catch((error) => {
        dispatchNotification(navigator)('Something went wrong');
      });
  } catch (error) {
    dispatchNotification(navigator)(error.response.data.error);
  }
};

export const startPersonalConversation = users => navigator => async (dispatch) => {
  // you want to check that the message already exists in state
  let target;
  const targets = users.map(item => item.id);
  targets.push(store.getState().users.current.id);
  const messages = store.getState().convos.logs;
  if (!messages || !messages.length) return await createNewConversation(users)(navigator)(dispatch);
  // you want to make sure the members are in the array;
  let filtered = messages.filter(item => item.type === 1 && item.members.length === targets.length);
  if (!filtered.length) return await createNewConversation(users)(navigator)(dispatch);
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
    store.dispatch({ type: 'CONVERSATION_RECEIVED', payload: target[0] });
    return navigator.push({ screen: 'Convo.Log', passProps: { target: target[0] } });
  }
  return await createNewConversation(users)(navigator)(dispatch);
};

export const createNewConversation = members => navigator => async (dispatch) => {
  const token = await AsyncStorage.getItem('#!@#$%');
  axios.request({
    method: 'post',
    url: `${config.postUrl}/convos/?type=1`,
    data: { members },
    headers: {
      Authorization: token
    }
  }).then((response) => {
    store.dispatch({ type: 'CONVERSATION_RECEIVED', payload: response.data.data });
    return navigator.push({ screen: 'Convo.Log', passProps: { target: response.data.dataHassHdd } });
  })
    .catch((err) => {
      console.log(err);
      dispatchNotification(navigator)('Something went wrong, Try again maybe?');
      navigator.pop();
    });
};


export const updateConversation = (id, navigator) => {
  axios.request({
    method: 'get',
    url: `${config.postUrl}/convos/${id}`
  })
    .then((response) => {
      store.dispatch({ type: 'CONVERSATION_UPDATED', payload: response.data.data });
    })
    .catch((err) => {
    // console.log(err)
      dispatchNotification(navigator)('Something went wrong, couldnt fetch the messages');
    });
};


export const fetchConversation = (target) => {
  const { logs } = store.getState().convos;
  const convo = logs.filter(item => item.id === target.id);
  return convo.messages;
};


export const JoinConversation = id => navigator => async (dispatch) => {
  // this assumes that the fella is joining a conversation like debate and all of dat
  const token = await AsyncStorage.getItem('#!@#$%');
  return axios.request({
    method: 'put',
    url: `${config.postUrl}/convos/join/${id}`
  }).then((response) => {
    // that means he is allowed to join the conversation
    dispatch({ type: 'CONVERSATION_RECEIVED', payload: response.data.data });
    navigator.push({ screen: '', passProps: { target: response.data.data } });
  })
    .catch((err) => {
      console.log(err); // remember to remove this when the app goes into production
      if (err.response.status && err.response.status === 401) {
        dispatchNotification(navigator)('Oops! Looks like you dont have permissions to join this conversation :(');
        return navigator.pop();
      }
      dispatchNotification(navigator)('Hey, looks like something went wrong, try again?');
      return navigator.pop();
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
  }).then(() => {
    // success he/she has left the conversation
    dispatchNotification(navigator)('Conversation Left. Thanks for nothing.');
  }).catch((err) => {
    console.log(err); // doing this for now
    dispatchNotification(navigator)('Sorry, that didnt quite work out. Try again?');
  });
};

export const sendMessage = (body, socket) => navigator => async (dispatch) => {
  // there has to be type and destination
  if (!body.type && !body.destination) return dispatchNotification(navigator)('Sorry, you need to send in the right message');
  dispatch({ type: 'INCOMING_MESSAGE', payload: body });
  // add the origin, since it will be saved to the db directly
  body.origin = store.getState().users.current;
  // push the message into the conversation Identifier
  return socket.emit(`new-message-${socket.id}`, body);
};
