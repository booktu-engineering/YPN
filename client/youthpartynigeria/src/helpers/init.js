import axios from 'axios';
import { AsyncStorage, AlertIOS } from 'react-native';
import config from '../config/index';
import configureStore from '../store';
import { navigatorObject } from '../navigation'

const { store } = configureStore();

export default async (token, navigator) => {
  const id = await AsyncStorage.getItem('#!@#$%ID');
  const flaggedContent = await AsyncStorage.getItem('flaggedStorage') || '';
  axios.request({
    method: 'get',
    url: `${config.baseUrl}/profile/${id}`,
    headers: {
      Authorization: token
    }
  })
    .then((response) => {
      store.dispatch({ type: 'INSERT_TOKEN', payload: response.data.token });
      store.dispatch({ type: 'USER_LOGGED_IN', payload: response.data.data });
      store.dispatch({ type: 'FLAGGED_CONTENT', payload: flaggedContent.split(', ') })
      store.dispatch({ type: 'FETCHED_ALL_RELATIONSHIPS', payload: { friends: response.data.friends, followers: response.data.followers } });
      navigator.registerOtherScreens(store);
      navigator.startLoggedIn();
    })
    .catch((err) => {
      console.log(err)
      navigator.startLoggedOut();
    })
}


export const LogOut = () => {
  AlertIOS.alert(
    `Are you sure you want to logout?`,
    '',
    [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => {
          AsyncStorage.removeItem('LastSeenMap');
          AsyncStorage.removeItem('#!@#$%ID');
          AsyncStorage.removeItem('flaggedStorage')
          navigatorObject.startLoggedOut();
        }
      },
    ]
  )
}