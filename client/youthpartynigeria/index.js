import { AsyncStorage } from 'react-native';
import Orientation from 'react-native-orientation';
import NavigatorBase from './src/navigation';
import Initializer from './src/helpers/init';


let token;
/* eslint-disable no-underscore-dangle */
class StartApp {
  constructor() {
    this.navigator = new NavigatorBase();
    this.navigator.__registerScreens();
  }

  start = () => {
    Orientation.lockToPortrait();
    AsyncStorage.getItem('#!@#$%')
      .then((token) => {
        if (token) return Initializer(token, this.navigator);
        this.navigator.startLoggedOut();
      });
    // this.navigator.startLoggedIn();
  }
}

const App = new StartApp();
App.start();
