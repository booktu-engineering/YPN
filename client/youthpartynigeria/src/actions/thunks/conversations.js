import axios from 'axios';
import { AsyncStorage } from 'react-native';
import config from "../../config";
import { dispatchNotification, StartProcess, EndProcess } from '../../helpers/uploader';
import configureStore from '../../store';
import QueueOps from '../../ops/MessageQueueOps';

const { store } = configureStore();
/* eslint max-len:0 */
export const fetchAllConversations = navigator => async (dispatch, getState) => {
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
        // bone the redundant p
        dispatch({ type: 'ALL_CONVERSATIONS_RECEIVED', payload: response.data.data });
        // create a registry
        const registry = response.data.data.reduce((a, b) => {
          const messages = getState().convos.registry && getState().convos.registry[b._id];
          const incoming = b.messages || [];
          const final = messages ? [...messages, ...incoming] : (b.messages || [])
          a[`${b._id}`] = final;
          return a;
        }, {});
        const activitymap = response.data.data.reduce((a, b) => {
          a[`${b._id}`] = b.visited;
          return a;
        }, {});
        dispatch({ type: 'CREATE_REGISTRY', payload: registry });
        dispatch({ type: 'CREATE_ACTIVITY_MAP', payload: activitymap });
      })
      .catch((error) => {
        console.log(error);
        dispatchNotification(navigator)('Something went wrong');
      });
  } catch (error) {
    dispatchNotification(navigator)(error.response.data.error);
  }
};


export const startPersonalConversation = (users, reference) => (navigator, topic) => async (dispatch, getState) => {
  try {
    StartProcess(navigator);
    // you want to check that the message already exists in state
    let target;
    const targets = users.map(item => item.id);
    targets.push(getState().users.current.id);
    const messages = getState().convos.logs;
    if (!messages || !messages.length) return await createNewConversation(users, reference)(navigator, topic)(dispatch);
    // you want to make sure the members are in the array;
    let filtered = messages.filter(item => item.type === 1 && item.members.length === targets.length);
    if (!filtered.length) return await createNewConversation(users, reference)(navigator, topic)(dispatch);
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
      return navigator.push({ screen: 'Convo.Log', passProps: { data: target, reference } });
    }
    return await  createNewConversation(users, reference)(navigator, topic)(dispatch);
  } catch (err) {
    EndProcess(navigator);
    dispatchNotification(navigator)('Something went wrong');
  }
};


export const createNewConversation = (members, reference) => (navigator, topic) => async (dispatch) => {
  const data = { members };
  if(topic){
    data.topic = topic
  }
  const token = await AsyncStorage.getItem('#!@#$%');
  axios.request({
    method: 'post',
    url: `${config.postUrl}/convos/?type=1`,
    data,
    headers: {
      Authorization: token
    }
  }).then((response) => {
    dispatch({ type: 'CONVERSATION_RECEIVED', payload: response.data.data });
    EndProcess(navigator);
    return navigator.push({ screen: 'Convo.Log', passProps: { data: response.data.data, reference } });
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
  activityMap[`${data.destination}`] = Date.now();
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

export const sendMessage = (body, socket) => navigator => async (dispatch, getState) => {
  // there has to be type and destination
  if (!body.type && !body.destination) return dispatchNotification(navigator)('Sorry, you need to send in the right message');
  dispatch(incomingMessage(body));
  // add the origin, since it might be saved to the db directly
  body.origin = getState().users.current;
  socket.emit('new-message', body);
  setTimeout(async () => {
    const activityMap = getState().convos.activityMap;
    activityMap[body.destination] = Date.now();
    const queuer = await QueueOps()
    queuer()({ target: activityMap, remove: true })
  }, 5000)
 

};
