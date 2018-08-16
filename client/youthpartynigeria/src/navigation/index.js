/* eslint-disable no-underscore-dangle, no-unused-vars */
import  Icon  from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Evil from 'react-native-vector-icons/EvilIcons'
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
import { BackIcon, SearchIcon, NotificationIcon, LeftNav } from '../modules/IconRegistry/';
import ShowEvent from '../modules/ShowEvent';
import CareersComponent from '../modules/Careers';
import ShowCareer from '../modules/ShowCareer';
import CandidateScreen from '../modules/Candidates';
import OpenPositions from '../modules/OpenPositions';
import ShowPosition from '../modules/ShowPosition';
import Gallery from '../modules/Gallery';
import Donation from '../modules/Donations';
import DonationMultipleCOMPONENT from '../modules/Donations/screens/phase-one';
import DonationPhaseTwoCOMPONENT from '../modules/Donations/screens/phase-two';
import Conversations from '../modules/Conversation';
import ShowConversation from '../modules/ShowConversation';
import ConversationLog from '../modules/ConversationLog';
import configureStore from '../store';
import NotificationScreen from '../mixins/notification';
import ShowUser from '../modules/ShowUser';
import FollowUser from '../modules/SingleUser/follow';
import Membership from '../modules/Payments/index';
import Pay from '../modules/Payments/pay';
import WebPage from '../modules/WebView/';
import ShowUsers from '../modules/ShowUsers';
import ProcessIndicator from '../modules/ProcessIndicator';
import ElectionScreen from '../modules/Elections/';
import VotingScreen from '../modules/Elections/screens/index';
import ViewPostPage from '../modules/ViewPost';
import ReplyPost from '../modules/ReplyPost';
import VoterEligibility from '../modules/VoterHistory';
import PDFViewer from '../modules/PdfViewer';
import AboutYouthParty from '../modules/AboutYouthParty';
import SelectEntries from '../modules/SelectEntries';
import RenderPolls from '../modules/Polls';
import ShowPoll from '../modules/Polls/screens';

const { Provider, store } = configureStore();
let homeIcon; 
let chatIcon;
let postIcon; 
let moreIcon;
let profileIcon


export default class Navigator {
  constructor() {
    Icon.getImageSource('ios-home-outline', 20, 'white').then((icon) => homeIcon = icon);
    Icon.getImageSource('ios-chatboxes-outline', 20, 'white').then((icon) => chatIcon = icon);
    MaterialIcon.getImageSource('add', 20, 'white').then((icon) => postIcon = icon);
    Icon.getImageSource('ios-menu', 20, 'white').then((icon) => moreIcon = icon);
    Evil.getImageSource('user', 20, 'white').then((icon) => profileIcon = icon);
    this.__registerScreens();
  }

  __registerScreens = () => {
    Navigation.registerComponent('Back.Button', () => BackIcon);
    Navigation.registerComponent('Search.Button', () => SearchIcon);
    Navigation.registerComponent('Notif.Button', () => NotificationIcon);
    Navigation.registerComponent('Left.Button', () => LeftNav);
    Navigation.registerComponent('App.notification', () => NotificationScreen);
    Navigation.registerComponent('Login.Component', () => LoginComponent, store, Provider);
    Navigation.registerComponent('Reset.Password', () => ResetPasswordComponent);
    Navigation.registerComponent('Landing.Component', () => LandingComponent);
    Navigation.registerComponent('SignUp.Component', () => SignUpComponent, store, Provider);
    Navigation.registerComponent('Verify.Component', () => VerifyComponent);
    Navigation.registerComponent('Declare.Interest', () => DeclareInterestComponent);
    Navigation.registerComponent('Process.Indicator', () => ProcessIndicator);
    Navigation.registerComponent('Web.Page', () => WebPage);
  }

  registerOtherScreens = (storex = store) => {
    Navigation.registerComponent('Home', () => HomeComponent, storex, Provider);
    Navigation.registerComponent('Chat.Component', () => ChatComponent, storex, Provider);
    Navigation.registerComponent('Post.Component', () => PostComponent, storex, Provider);
    Navigation.registerComponent('Profile.Component', () => ProfileComponent, storex, Provider);
    Navigation.registerComponent('More.Component', () => MoreComponent, storex, Provider);
    Navigation.registerComponent('Drawer', () => Drawer, storex, Provider);
    Navigation.registerComponent('Home.Nav', () => HomeNav);
    Navigation.registerComponent('Events.Screen', () => EventComponent, storex, Provider);
    Navigation.registerComponent('Show.Event', () => ShowEvent, storex, Provider);
    Navigation.registerComponent('Careers', () => CareersComponent, storex, Provider);
    Navigation.registerComponent('Show.Career', () => ShowCareer, storex, Provider);
    Navigation.registerComponent('Candidate.Screen', () => CandidateScreen, storex, Provider);
    Navigation.registerComponent('Open.Position', () => OpenPositions, storex, Provider);
    Navigation.registerComponent('Show.Position', () => ShowPosition, storex, Provider);
    Navigation.registerComponent('Gallery.Component', () => Gallery);
    Navigation.registerComponent('Donation.Component', () => Donation, storex, Provider);
    Navigation.registerComponent('DonationPT', () => DonationPhaseTwoCOMPONENT, storex, Provider);
    Navigation.registerComponent('Convo.Component', () => Conversations, storex, Provider);
    Navigation.registerComponent('Show.Convo', () => ShowConversation);
    Navigation.registerComponent('Convo.Log', () => ConversationLog, storex, Provider);
    Navigation.registerComponent('Show.User', () => ShowUser, storex, Provider);
    Navigation.registerComponent('Follow.User', () => FollowUser, storex, Provider);
    Navigation.registerComponent('DonationM.Component', () => DonationMultipleCOMPONENT, storex, Provider);
    Navigation.registerComponent('Membership.Component', () => Membership, storex, Provider);
    Navigation.registerComponent('Pay.Component', () => Pay, storex, Provider);
    Navigation.registerComponent('Show.Users', () => ShowUsers);
    Navigation.registerComponent('Elections.Screen', () => ElectionScreen, storex, Provider);
    Navigation.registerComponent('Voting.Screen', () => VotingScreen, storex, Provider);
    Navigation.registerComponent('View.Post', () => ViewPostPage, storex, Provider);
    Navigation.registerComponent('Reply.Post', () => ReplyPost, storex, Provider);
    Navigation.registerComponent('Voter.Page', () => VoterEligibility, storex, Provider);
    Navigation.registerComponent('Pdf.View', () => PDFViewer);
    Navigation.registerComponent('About', () => AboutYouthParty);
    Navigation.registerComponent('Select.Entries', () => SelectEntries);
    Navigation.registerComponent('Render.Polls', () => RenderPolls, storex, Provider);
    Navigation.registerComponent('Show.Poll', () => ShowPoll);
  }

  startLoggedOut = () => {
    Navigation.startSingleScreenApp({
      screen: {
        screen: 'Landing.Component'
      }
    });
  }

  startLoggedIn = () => {
    Navigation.startTabBasedApp({
      tabs: [
        {
          screen: 'Home',
          label: 'Home',
          title: 'Home',
          icon: homeIcon
        },
        {
          screen: 'Chat.Component',
          label: 'Chat',
          title: 'Chat', 
          icon: chatIcon
        },
        {
          screen: 'Post.Component',
          label: 'Post',
          title: 'New Post',
          icon: postIcon
        },
        {
          screen: 'Profile.Component',
          label: 'Profile',
          title: 'Profile', 
          icon: profileIcon
        },
        {
          screen: 'More.Component',
          label: 'More', 
          icon: moreIcon
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
