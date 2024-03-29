import axios from 'axios';
import { AsyncStorage } from 'react-native';
import config from '../config/index';
import configureStore from '../store';
import { navigatorObject } from '../navigation'

const { store } = configureStore();

export default async (token, navigator) => {
  const id = await AsyncStorage.getItem('#!@#$%ID');
  axios.request({
    method: 'get',
    url: `${config.baseUrl}/profile/${id}`,
    headers: {
      Authorization: token
    }
  })
    .then((response) => {
      console.log(response.data.token);
      store.dispatch({ type: 'INSERT_TOKEN', payload: response.data.token });
      store.dispatch({ type: 'USER_LOGGED_IN', payload: response.data.data });
      store.dispatch({ type: 'FETCHED_ALL_RELATIONSHIPS', payload: { friends: response.data.friends, followers: response.data.followers } });
      navigator.registerOtherScreens(store);
      navigator.startLoggedIn();
    })
    .catch((err) => {
      navigator.startLoggedOut();
    })
}


export const LogOut = () => {
    AsyncStorage.removeItem('#!@#$%ID');
    navigatorObject.startLoggedOut();
}