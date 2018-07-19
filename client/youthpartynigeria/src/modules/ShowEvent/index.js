import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { BackIcon, SearchIcon } from '../IconRegistry/';
import { height, width, bigButton, buttonText } from '../../mixins';

const uri = 'https://socialmediaweek.org/london/files/2017/09/71A6202.jpg'
class ShowEvent extends Component {
  constructor(props) {
    super(props)
    const { navigator } =  this.props
    navigator.setDrawerEnabled({ side: 'left', enabled: false });
    navigator.setButtons({
      leftButtons: [
        {
          id: 'nacv', 
          component: 'Back.Button', 
          passProps: {
            navigator
          }
        }
      ], 
      rightButtons: [
        {
          id: 'searchButton', 
          component: 'Search.Button', 
          passProps: {
            navigator
          }
        }
      ]
    })
  }

 

  backIcon = () => <BackIcon navigator={this.props.navigator} />
  searchIcon = () => <SearchIcon navigator={this.props.navigator} />

render = () => <RenderEvent />
}

const RenderEvent = () => (
  <View style={{  flex: 1 }}>
    <View style={{ height: height * 0.3, width, alignItems: 'center', justifyContent: 'center', borderBottomColor: '#D0D3D420', borderBottomWidth: 1 }}>
      <Image style={{ height: 76, width: 76, borderRadius: 38, marginBottom: 15 }} source={{ uri }}/>
      <Text style={{ fontSize: 17, fontWeight: '600', color: '#191A1A', marginBottom: 10}}> Capacity Building Workshop </Text>
      <Text style={{ fontSize: 13, fontWeight: '600', color: '#B3B6B7', marginBottom: 8}}> Date: { '20th June, 2018'}</Text>
      <Text style={{ fontSize: 13, fontWeight: '600', color: '#B3B6B7', marginBottom: 8}}> Time: {'3:00PM'}</Text>
</View>
<View style={{ height: height * 0.35, width, paddingLeft: 25, paddingTop: 25 }}>
  <Text style={{ fontSize: 14, fontWeight: '600', color: '#191A1A', marginBottom: 8}}> Location </Text>
  <Text style={{ fontSize: 12.5, fontWeight: '400', color: '#979A9A', marginBottom: 28}}> Allen Avenue, Ikeja, Lagos </Text>
  <Text style={{ fontSize: 14, fontWeight: '600', color: '#191A1A', marginBottom: 8}}> Event Details </Text>
  <Text style={{ fontSize: 12.5, fontWeight: '400', color: '#979A9A', width: width * 0.86}}> The purpose of this session
    is to raise participants awareness of the importance of responding to calls
    for applications and equipping them with the necessary technical tools for a better understanding of the SDGs and
    to improve their skills in drawing up applications.
   </Text>
</View>
<View style={{ height: 50, borderColor: '#B3B6B720', borderTopWidth: 1, borderBottomWidth: 1, justifyContent: 'center'}}>
    <Text style={{ fontSize: 16, fontWeight: '600', alignSelf: 'center'}}> Attend Event? </Text>
</View>
 <ButtonStack />
  </View>
)

const ButtonStack = () => (
  <View style={{ width, height: height * 0.18, flexDirection: 'row', flexWrap: 'nowrap', alignItems: 'center', justifyContent: 'space-around'}}>
    <TouchableOpacity style={{ ...bigButton, width: 90, }}>
      <Text style={{ ...buttonText}}> YES </Text>
    </TouchableOpacity>
    <TouchableOpacity style={{ ...bigButton, width: 90, backgroundColor: '#F4D03F'}}>
      <Text style={{ ...buttonText}}> NO </Text>
    </TouchableOpacity>
    <TouchableOpacity style={{ ...bigButton, width: 90, backgroundColor: '#E74C3C'}}>
      <Text style={{ ...buttonText}}> MAYBE </Text>
    </TouchableOpacity>
  </View>
)

ShowEvent.navigatorStyle = {
  tabBarHidden: true
}

export default ShowEvent
