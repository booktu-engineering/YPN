import { Navigation } from 'react-native-navigation';
import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
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
            <Text style={{ color: 'white', fontWeight: '600', fontSize: 12 }}> Donate </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{ color: 'white', fontWeight: '600', fontSize: 12 }} onPress={() => { this.props.navigator.dismissLightBox(); __StackNavigator(this.previousTab).push({ screen: 'Careers', title: 'Careers'})}}> Careers </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{ color: 'white', fontWeight: '600', fontSize: 12 }}> Constitution </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.navigate('Candidate.Screen', 'Candidates')}>
            <Text style={{ color: 'white', fontWeight: '600', fontSize: 12 }}> Candidates </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{ color: 'white', fontWeight: '600', fontSize: 12 }}> Survey </Text>
          </TouchableOpacity>
        </View>
        { /* Second  grid */}
        <View style={{ height: height * 0.1, width, flexDirection: 'row', flexWrap: 'nowrap', alignItems: 'center', justifyContent: 'space-around' }}>
          <TouchableOpacity>
            <Text style={{ color: 'white', fontWeight: '600', fontSize: 12 }}> Elections </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.navigate('Convo.Component', 'Debates')}>
            <Text style={{ color: 'white', fontWeight: '600', fontSize: 12 }}> Debate </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{ color: 'white', fontWeight: '600', fontSize: 12 }}> Excos </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.navigate('Gallery.Component', 'Gallery')}>
            <Text style={{ color: 'white', fontWeight: '600', fontSize: 12 }}> Gallery </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { this.props.navigator.dismissLightBox(); __StackNavigator(this.previousTab).push({ screen: 'Events.Screen', title: 'Events'})}}>
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
