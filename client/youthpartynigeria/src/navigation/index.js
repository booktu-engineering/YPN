/* eslint-disable no-underscore-dangle, no-unused-vars */
import React from 'react';
import { Navigation } from 'react-native-navigation';
import LoginComponent from '../modules/Login/';
import ResetPasswordComponent from '../modules/Reset-Password'
import LandingComponent from '../modules/Landing'
import SignUpComponent from '../modules/SignUp'
import VerifyComponent from '../modules/VerifyAccount'
import DeclareInterestComponent from '../modules/DeclareInterest/'
import HomeComponent from '../modules/Home/'
import ChatComponent from '../modules/Chat/'
import PostComponent from '../modules/Post/'
import ProfileComponent from '../modules/Profile';
import MoreComponent from '../modules/More'
import Drawer from '../modules/Drawer';

export default class Navigator {
  constructor() {
    this.__registerScreens();
  }

  __registerScreens = () => {
    Navigation.registerComponent('Login.Component', () => LoginComponent);
    Navigation.registerComponent('Reset.Password', () => ResetPasswordComponent);
    Navigation.registerComponent('Landing.Component', () => LandingComponent )
    Navigation.registerComponent('SignUp.Component', () => SignUpComponent)
    Navigation.registerComponent('Verify.Component', () => VerifyComponent)
    Navigation.registerComponent('Declare.Interest', () => DeclareInterestComponent)
    Navigation.registerComponent('Home', () => HomeComponent)
    Navigation.registerComponent('Chat.Component', () => ChatComponent)
    Navigation.registerComponent('Post.Component', () => PostComponent)
    Navigation.registerComponent('Profile.Component', () => ProfileComponent)
    Navigation.registerComponent('More.Component', () => MoreComponent)
    Navigation.registerComponent('Drawer', () => Drawer)
  }

  startLoggedOut = () => {
    Navigation.startSingleScreenApp({
      screen: {
        screen: 'Landing.Component'
      }
    });
  }

  startLoggedIn = (props) => {
    Navigation.startTabBasedApp({
      tabs: [
        {
          screen: 'Home',
          label: 'Home'
        },
        {
          screen: 'Chat.Component',
          label: 'Chat'
        },
        {
          screen: 'Post.Component',
          label: 'Post'
        },
        {
          screen: 'Profile.Component',
          label: 'Profile'
        },
        {
          screen: 'More.Component',
          label: 'More'
        },
      ],
      tabsStyle: {
        tabBarBackgroundColor: 'black',
        tabBarButtonColor: 'white',
        tabBarTextFontSize: 13,
        tabBarTextFontWeight: '500',
        tabBarSelectedLabelColor: 'yellow',
        tabBarSelectedButtonColor: 'yellow',
        tabBarHideShadow: false
      },
      drawer: {
        left: {
          screen: 'Drawer'
        },
        style: {
          drawerShadow: false
        }
      }
    });
  }
}

export const navigatorObject = new Navigator();
