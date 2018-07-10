/* eslint-disable no-underscore-dangle, no-unused-vars */
import React from 'react';
import { Navigation } from 'react-native-navigation';
import LoginComponent from '../modules/Login/';
import ResetPasswordComponent from '../modules/Reset-Password';
import LandingComponent from '../modules/Landing';
import SignUpComponent from '../modules/SignUp';
import VerifyComponent from '../modules/VerifyAccount';
import DeclareInterestComponent from '../modules/DeclareInterest/';
import HomeComponent from '../modules/Home/';
import ChatComponent from '../modules/Chat/';
import PostComponent from '../modules/Post/';
import ProfileComponent from '../modules/Profile';
import MoreComponent from '../modules/More';
import Drawer from '../modules/Drawer';
import HomeNav from '../modules/NavBars/home';
import EventComponent from '../modules/Events';
import { BackIcon, SearchIcon } from '../modules/IconRegistry/';
import ShowEvent from '../modules/ShowEvent';
import CareersComponent from '../modules/Careers';
import ShowCareer from '../modules/ShowCareer';
import CandidateScreen from '../modules/Candidates';
import OpenPositions from '../modules/OpenPositions';
import ShowPosition from '../modules/ShowPosition';
import Gallery from '../modules/Gallery';
import Donation from '../modules/Donations';
import DonationMultiple from '../modules/Donations/screens/phase-one';
import DonationPhaseTwo from '../modules/Donations/screens/phase-two';
import Conversations from '../modules/Conversation';
import ShowConversation from '../modules/ShowConversation';
import ConversationLog from '../modules/ConversationLog';
import configureStore from '../store';
import NotificationScreen from '../mixins/notification';
import ShowUser from '../modules/ShowUser';

const { Provider, store } = configureStore();

export default class Navigator {
  constructor() {
    this.__registerScreens();
  }

  __registerScreens = () => {
    Navigation.registerComponent('Login.Component', () => LoginComponent, store, Provider);
    Navigation.registerComponent('Reset.Password', () => ResetPasswordComponent);
    Navigation.registerComponent('Landing.Component', () => LandingComponent);
    Navigation.registerComponent('App.notification', () => NotificationScreen);
    Navigation.registerComponent('SignUp.Component', () => SignUpComponent, store, Provider);
    Navigation.registerComponent('Verify.Component', () => VerifyComponent);
    Navigation.registerComponent('Declare.Interest', () => DeclareInterestComponent);
    Navigation.registerComponent('Home', () => HomeComponent, store, Provider);
    Navigation.registerComponent('Chat.Component', () => ChatComponent, store, Provider);
    Navigation.registerComponent('Post.Component', () => PostComponent, store, Provider);
    Navigation.registerComponent('Profile.Component', () => ProfileComponent, store, Provider);
    Navigation.registerComponent('More.Component', () => MoreComponent);
    Navigation.registerComponent('Drawer', () => Drawer, store, Provider);
    Navigation.registerComponent('Home.Nav', () => HomeNav);
    Navigation.registerComponent('Events.Screen', () => EventComponent);
    Navigation.registerComponent('Show.Event', () => ShowEvent);
    Navigation.registerComponent('Careers', () => CareersComponent);
    Navigation.registerComponent('Show.Career', () => ShowCareer);
    Navigation.registerComponent('Candidate.Screen', () => CandidateScreen);
    Navigation.registerComponent('Open.Position', () => OpenPositions);
    Navigation.registerComponent('Show.Position', () => ShowPosition);
    Navigation.registerComponent('Gallery.Component', () => Gallery);
    Navigation.registerComponent('Donation.Component', () => Donation, store, Provider);
    Navigation.registerComponent('DonationM.Component', () => DonationMultiple, store, Provider);
    Navigation.registerComponent('DonationPT', () => DonationPhaseTwo, store, Provider);
    Navigation.registerComponent('Convo.Component', () => Conversations);
    Navigation.registerComponent('Show.Convo', () => ShowConversation);
    Navigation.registerComponent('Convo.Log', () => ConversationLog, store, Provider);
    Navigation.registerComponent('Show.User', () => ShowUser, store, Provider);
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
          label: 'Home',
          title: 'Home'
        },
        {
          screen: 'Chat.Component',
          label: 'Chat',
          title: 'Chat'
        },
        {
          screen: 'Post.Component',
          label: 'Post',
          title: 'New Post'
        },
        {
          screen: 'Profile.Component',
          label: 'Profile',
          title: 'Profile'
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
