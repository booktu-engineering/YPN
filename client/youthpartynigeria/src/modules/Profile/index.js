import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { defaultGreen, height, width } from '../../mixins/';
import { multiplePosts } from '../SinglePost/';
import { MultipleEvents } from '../SingleEvent';


const uri = 'https://menhairstylist.com/wp-content/uploads/2017/07/dreads-in-man-bun-black-men-hairstyles.jpg'
let nav;
class ProfileComponent extends Component {

static navigatorStyle = {
  navBarBackgroundColor: defaultGreen,
  statusBarTextColorScheme: 'light',
  navBarNoBorder: true
}

static navigatorButtons = {
  leftButtons: [
    {
      id: 'ShowNav',
      component: 'Left.Button'
    }
  ]
}

constructor(props) {
  super(props);
  this.state = {
  viewEvents: false
  };
  nav = this.props.navigator;
}

  render = () => {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: height * 0.07, backgroundColor: defaultGreen  }}></View>
        <DisplayBio />
        <ButtonStack />
        { /* That barrieer thing */}
        <View style={{ height: height * 0.05, width, flexDirection: 'row', flexWrap: 'nowrap' }}>
          <TouchableOpacity style={{ height: height * 0.05, width: width * 0.5, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8F9F9' }} onPress={() => { this.setState({ viewEvents: false }) }}>
            <Text style={{ fontSize: 12.3, fontWeight: '600', color: this.state.viewEvents ? '#626567' : defaultGreen }}> Recent Posts </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ height: height * 0.05, width: width * 0.5, justifyContent: 'center', alignItems: 'center', backgroundColor: '#E5E8E8'}} onPress={() => { this.setState({ viewEvents: true })}}>
            <Text style={{ fontSize: 12.3, fontWeight: '600', color: !this.state.viewEvents ? '#626567' : defaultGreen }}> Recent Events </Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: height * 0.6 }}>
            { this.state.viewEvents ? MultipleEvents([1,2,3])() : multiplePosts([1, 2, 3])({ height: height * 0.3})}
        </View>
      </View>
    )
  }
}


const DisplayBio = () => (
  <View style={{ height: height * 0.2, width, marginBottom: 5 }}>
    {/* This should contain the image and name */}
    <View style={{ height: height * 0.1, marginBottom: 10,  width, flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'space-around' }}>
      <Image style={{ height: 90, width: 90, borderRadius: 45, position: 'relative', top: -30 }} source={{ uri }}/>
      <View style={{ width: width * 0.5, position: 'relative', left: -35, paddingTop: 10 }}>
        <Text style={{ fontSize: 17, fontWeight: '600', marginBottom: 5, color: '#363636' }}> John Doe </Text>
        <Text style={{ fontSize: 12, fontWeight: '600', color: '#909497' }}> Ward 12 | Surulere LGA </Text>
    </View>
  </View>
  { /* Render the bio */}
  <Text style={{ fontSize: 11.5, fontWeight: '500', color: '#909497', width: width * 0.9, alignSelf:'flex-start', position: 'relative', right: -30}}> Philosopher | Human Rights Activist...I believe n an urgent restoration of active and participatory democracy, social justiceand good leadership </Text>
  </View>
)

const ButtonStack = () => (
  <View style={{ width, height: height * 0.08, paddingRight: 16, paddingLeft: 16, flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'space-around' }}>
    <TouchableOpacity style={{ height: height * 0.04, width: width * 0.27, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#D0D3D4', borderRadius: 3}}>
      <Text style={{ fontSize: 11, color: '#979A9A'}}><Text style={{ fontWeight: '600', color: '#626567'}}> 500 </Text>Followers </Text>
    </TouchableOpacity>
    <TouchableOpacity style={{ height: height * 0.04, alignItems: 'center', justifyContent: 'center', width: width * 0.27, borderWidth: 1, borderColor: '#D0D3D4', borderRadius: 3}}>
      <Text style={{ fontSize: 11, color: '#979A9A'}}><Text style={{ fontWeight: '600', color: '#626567'}}> 250 </Text>Following </Text>
    </TouchableOpacity>
    <TouchableOpacity style={{ height: height * 0.04, alignItems: 'center', justifyContent: 'center', width: width * 0.27, backgroundColor: defaultGreen, borderRadius: 3}}>
      <Text style={{ fontSize: 11, color: '#fff'}}> View Interests </Text>
    </TouchableOpacity>
  </View>
)

export const ProfileNavigator = () => nav;
export default ProfileComponent
