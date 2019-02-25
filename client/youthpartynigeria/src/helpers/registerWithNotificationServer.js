import { AsyncStorage } from 'react-native';
import axios from 'axios';
import { dispatchNotification } from '../helpers/uploader';
import { fetchAllNotifications } from '../actions/thunks/notifications';
import OneSignal from 'react-native-onesignal';
import config from '../config';


export default (device, navigator) => async (dispatch, getState) => {
  const onReceived = (notification) => {
    dispatch(fetchAllNotifications());
    dispatchNotification(navigator)(notification.payload.body)
  };

  const onOpened = (result) => {
    if(result.notification && (result.notification.payload.body.search('message') !== -1)){
      return navigator.switchToTab({ tabIndex: 1 })
    }
    navigator.push({ screen: 'Show.Notifications', title: 'Notifications' })
  }
  OneSignal.addEventListener('received', onReceived);
  OneSignal.addEventListener('opened', onOpened);

 
  

  if (!device.userId) return;
  // const playerId = await AsyncStorage.getItem('OneSignalPlayerId');
  // if (playerId) return; // the guy is already registered;
  // console.log(config.realTimeUrl);

  axios
    .request({
      url: `${config.realTimeUrl}/register`,
      method: 'post',
      data: {
        playerId: device.userId
      },
      headers: {
        Authorization: getState().users.token
      }
    })
    .then((response) => {
      AsyncStorage.setItem('OneSignalPlayerId', response.data.playerId);
    })
    .catch((err) => {
      console.log(err.response);
      console.log(err);
    });
};