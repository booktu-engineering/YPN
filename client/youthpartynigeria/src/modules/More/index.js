import { Navigation } from 'react-native-navigation';
import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { height, width } from '../../mixins';
import __StackNavigator from './helper';

class More extends Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent((e) => {
      if (e.id === 'bottomTabSelected') {
        this.props.navigator.switchToTab({ tabIndex: e.unselectedTabIndex });
        this.previousTab = e.unselectedTabIndex
        Navigation.registerComponent('More.Modal', () => this.moreModal)
        return this.props.navigator.showLightBox({ screen: 'More.Modal', style: { tapBackgroundToDismiss: true }, })
      }
    });
  }

  componentWillMount() {
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent = (e) => {
    if (e.id === 'bottomTabSelected') {
      this.props.navigator.switchToTab({ tabIndex: e.unselectedTabIndex });
      this.previousTab = e.unselectedTabIndex
      Navigation.registerComponent('More.Modal', () => this.moreModal)
      return this.props.navigator.showLightBox({ screen: 'More.Modal', style: { tapBackgroundToDismiss: true }, })
    }
  }

  navigate = (screen, title) => {
    this.props.navigator.dismissLightBox();
    __StackNavigator(this.previousTab).push({ screen, title });
  }

  moreModal = () => (
    <View style={{ flex: 1, backgroundColor: "#1A1A1A00", height, width }}>
      <TouchableOpacity style={{ position: 'absolute', height: height * 0.7, width, top: 0, opacity: 0 }} onPress={() => this.props.navigator.dismissLightBox()}></TouchableOpacity>
      <View style={{ height: height * 0.3, width, position: 'absolute', bottom: 0, backgroundColor: '#06060699', paddingTop: 10  }}>
        { /* First grid */}
        <View style={{ height: height * 0.1, width, flexDirection: 'row', flexWrap: 'nowrap', borderBottomWidth: 1, borderBottomColor: '#ffffff60', alignItems: 'center', justifyContent: 'space-around' }}>
          <TouchableOpacity onPress={() => this.navigate('Donation.Component', 'Donation')}>
            <EvilIcon name="heart" size={24} color="white" style={{ position: 'relative', marginBottom: 3, right: -11 }}/>
            <Text style={{ color: 'white', fontWeight: '600', fontSize: 12 }}> Donate </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicon name="md-briefcase" size={24} color="white" style={{ position: 'relative', marginBottom: 3, right: -18 }}/>
            <Text style={{ color: 'white', fontWeight: '600', fontSize: 12 }} onPress={() => { this.props.navigator.dismissLightBox(); __StackNavigator(this.previousTab).push({ screen: 'Careers', title: 'Careers'})}}> Careers </Text>
          </TouchableOpacity>
          <TouchableOpacity>
          <Ionicon name="ios-megaphone" size={24} color="white" style={{ position: 'relative', marginBottom: 3, right: -28 }}/>
            <Text style={{ color: 'white', fontWeight: '600', fontSize: 12 }}> Town Hall </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.navigate('Candidate.Screen', 'Candidates')}>
          <Ionicon name="ios-flag-outline" size={24} color="white" style={{ position: 'relative', marginBottom: 3, right: -30 }}/>
            <Text style={{ color: 'white', fontWeight: '600', fontSize: 12 }}> Candidates </Text>
          </TouchableOpacity>
          <TouchableOpacity>
          <Ionicon name="ios-stats-outline" size={24} color="white" style={{ position: 'relative', marginBottom: 3, right: -11 }}/>
            <Text style={{ color: 'white', fontWeight: '600', fontSize: 12 }}> Survey </Text>
          </TouchableOpacity>
        </View>
        { /* Second  grid */}
        <View style={{ height: height * 0.1, width, flexDirection: 'row', flexWrap: 'nowrap', alignItems: 'center', justifyContent: 'space-around' }}>
          <TouchableOpacity onPress={() => this.navigate('Elections.Screen', 'Elections')} style={{ position: 'relative', left: -5 }}>
          <Ionicon name="ios-checkmark-circle-outline" size={24} color="white" style={{ position: 'relative', marginBottom: 3, right: -18 }}/>
            <Text style={{ color: 'white', fontWeight: '600', fontSize: 12 }}> Elections </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.navigate('Convo.Component', 'Debates')} style={{ position: 'relative', left: -15 }}>
          <Ionicon name="ios-microphone-outline" size={24} color="white" style={{ position: 'relative', marginBottom: 3, right: -17 }}/>
            <Text style={{ color: 'white', fontWeight: '600', fontSize: 12 }}> Debate </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ position: 'relative', left: -12 }}>
            <MaterialIcon name="sitemap" size={24} color="white" style={{ position: 'relative', marginBottom: 3, right: -9 }} />
            <Text style={{ color: 'white', fontWeight: '600', fontSize: 12 }}> Excos </Text>
          </TouchableOpacity>
          <TouchableOpacity  style={{ position: 'relative', left: -5 }} onPress={() => this.navigate('Gallery.Component', 'Gallery')}>
          <Ionicon name="ios-camera-outline" size={24} color="white" style={{ position: 'relative', marginBottom: 3, right: -17 }}/>
            <Text style={{ color: 'white', fontWeight: '600', fontSize: 12 }}> Gallery </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { this.props.navigator.dismissLightBox(); __StackNavigator(this.previousTab).push({ screen: 'Events.Screen', title: 'Events'})}}>
          <Ionicon name="ios-calendar-outline" size={24} color="white" style={{ position: 'relative', marginBottom: 3, right: -13 }}/>
            <Text style={{ color: 'white', fontWeight: '600', fontSize: 12 }}> Events </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )






render = () => {
  this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  return null
}
}



export default More;
