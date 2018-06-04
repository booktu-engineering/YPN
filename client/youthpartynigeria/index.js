import { AsyncStorage } from 'react-native';
import NavigatorBase from './src/navigation/';

let token;
/* eslint-disable no-underscore-dangle */
class StartApp {
  constructor() {
    this.navigator = new NavigatorBase();
    this.navigator.__registerScreens();
  }

  start = () => {
    AsyncStorage.getItem('userToken')
    .then((token) => {
      if(token) return this.navigator.startLoggedIn()
      this.navigator.startLoggedOut();
    })
  }
}

const App = new StartApp();
App.start();
