/* eslint-disable no-underscore-dangle, no-unused-vars */
import React from 'react';
import { Navigation } from 'react-native-navigation';
import LoginComponent from '../modules/Login/';
import ResetPasswordComponent from '../modules/Reset-Password'


export default class Navigator {
  constructor() {
    this.__registerScreens();
  }

  __registerScreens = () => {
    Navigation.registerComponent('Login.Component', () => LoginComponent);
    Navigation.registerComponent('Reset.Password', () => ResetPasswordComponent);
  }

  startLoggedOut = () => {
    Navigation.startSingleScreenApp({
      screen: {
        screen: 'Login.Component',
        title: 'Login'
      }
    });
  }

  startLoggedIn = (props) => {
    Navigation.startTabBasedApp({
      tabs: [
        {
          screen: {
            screen: 'LoginComponent'
          }
        }
      ]
    });
  }
}
