import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { View, Text, ScrollView } from 'react-native';
import EvilIcon from 'react-native-vector-icons/EvilIcons'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { defaultGreen } from '../../mixins/';
import SinglePost from '../SinglePost/'
// Navs
let nav;
const LeftNav = (props) => <EvilIcon name="navicon" color="white" size={28} onPress={() => { nav.toggleDrawer({ side: 'left', animated: true }) }}/>
//

const NotificationIcon = () => (
  <View style={{ flex: 1 }}>
    <View style={{ height: 15, width: 15, alignItems:'center', borderRadius: 7.5, backgroundColor: 'red', position:'absolute', zIndex: 2, left: 15, top: -5 }}>
      <Text style={{ fontSize: 10, position: 'relative', right: 1, color: 'white', textAlign: 'center', fontWeight: '700' }}> 6 </Text>
    </View>
    <Ionicon name="ios-notifications-outline" color="white" size={25} />
  </View>
);

const SearchIcon = () => <Ionicon name="ios-search-outline" color="white" size={25} />

Navigation.registerComponent('Left.Button', () => LeftNav)
Navigation.registerComponent('Search.Button', () => SearchIcon)
Navigation.registerComponent('Notif.Button', () => NotificationIcon);

// you sh
const Home = (props) => {
  const { navigator } = props;
  this.props = props
  nav = navigator;
  this.props = props;
  this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  onNavigatorEvent = (e) => {
    if(e.id === 'willDisappear') console.log(e)
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <SinglePost />
      <SinglePost />
    </ScrollView>
  );
}

Home.navigatorStyle = {
  navBarBackgroundColor: defaultGreen,
  statusBarTextColorScheme: 'light',
  preferredContentSize: { height: 2000 }
}


Home.navigatorButtons = {
  leftButtons: [
    {
      id: 'showNav',
      component: 'Left.Button'
    }
  ],
  rightButtons: [
    {
      id: 'NotificationPress',
      component: 'Notif.Button'
    },
    {
      id: 'Search',
      component: 'Search.Button'
    },
  ]
}
export const HomeNavigator = () => nav;
export default Home;
