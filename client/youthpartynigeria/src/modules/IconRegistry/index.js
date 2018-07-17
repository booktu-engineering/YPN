import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native'
import { Navigation } from 'react-native-navigation';
import EvilIcon from 'react-native-vector-icons/EvilIcons'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { fetchFollowersForUser } from '../../actions/thunks/user';


export const LeftNav = props => <EvilIcon name="navicon" color="white" size={28} onPress={() => { props.navigator.toggleDrawer({ side: 'left', animated: true }) }}/>
//

export const NotificationIcon = ({ navigator }) => (
  <TouchableOpacity style={{ flex: 1 }}>
    <View style={{ height: 15, width: 15, alignItems:'center', borderRadius: 7.5, backgroundColor: 'red', position:'absolute', zIndex: 2, left: 15, top: -5 }}>
      <Text style={{ fontSize: 10, position: 'relative', right: 1, color: 'white', textAlign: 'center', fontWeight: '700' }}> 6 </Text>
    </View>
    <Ionicon name="ios-notifications-outline" color="white" size={25} />
  </TouchableOpacity>
);

export const SearchIcon = ({ navigator, dispatch }) => <TouchableOpacity style={{ flex: 1 }} onPress={() => { if(!navigator || !dispatch) return null; dispatch(fetchFollowersForUser(navigator)) }}><Ionicon name="ios-search-outline" color="white" size={25} /></TouchableOpacity>

export const CameraIcon = ({ color, size, style }) => <Ionicon name="ios-camera-outline" style={style} color={color} size={size} />
export const BackIcon = (props) => (
  <TouchableOpacity style={{ flex: 1 }} onPress={() => { if(props.modal) return props.navigator.dismissModal({ animation: 'slide-down'}); props.navigator.pop() }}> 
    <Ionicon name="ios-arrow-back-outline" color="white" size={25}/>
   </TouchableOpacity>
)

export const SendIcon = ({ color, size }) => <Ionicon name="ios-send" color={color} size={size} />

export const withNavigation = (navigator, Component) => <Component navigator={navigator} />
