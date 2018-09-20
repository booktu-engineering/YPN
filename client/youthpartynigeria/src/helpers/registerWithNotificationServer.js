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

  OneSignal.addEventListener('received', onReceived);
  OneSignal.addEventListener('opened', onOpened);
  
  const onOpened = (result) => navigator.push({ screen: 'Show.Notifications', title: 'Notifications' })
  

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
