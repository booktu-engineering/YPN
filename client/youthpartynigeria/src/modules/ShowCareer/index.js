import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { BackIcon, SearchIcon } from '../IconRegistry';
import { height, width, defaultGreen, bigButton, buttonText } from '../../mixins'


const uri = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Coat_of_arms_of_Nigeria.svg/2000px-Coat_of_arms_of_Nigeria.svg.png'

class ShowCareer extends Component {
  constructor(props) {
    super(props)
    const { navigator } =  this.props
    navigator.toggleTabs({ to: 'hidden', animated: true });
    navigator.setDrawerEnabled({ side: 'left', enabled: false });
  }

  componentDidMount = () => {
    Navigation.registerComponent('Sc.Back.Button', () => this.backIcon)
  }

  backIcon = () => <BackIcon navigator={this.props.navigator} />
  searchIcon = () => <SearchIcon navigator={this.props.navigator} />

render = () => <RenderCareer />
}


const RenderCareer = () => (
  <View style={{ flex: 1 }}>
    { /* show the first card */}
    <View style={{ height: height * 0.15, width,
        flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'space-between',
        alignItems: 'center', paddingLeft: 15, paddingRight: 15, paddingTop: 15,  borderColor: '#B3B6B730', borderTopWidth: 0.3, borderBottomWidth: 0.3 }}
        >
        <View style={{ height: height * 0.13, width: width * 0.3, flexDirection: 'row', flexWrap: 'nowrap',}}>
          <Image style={{ height: 60, width: 60, borderRadius: 30, marginRight: 10 }} source={{ uri }}/>
          <View style={{ height: height * 0.10, width: width * 0.34, justifyContent: 'center' }}>
            <Text style={{ fontSize: 15, fontWeight: '600', color: '#1B1C1C', marginBottom: 5}}> Youth Party </Text>
            <Text style={{ fontSize: 13, fontWeight: '600', color: defaultGreen, marginBottom: 5}}> Personal assistant </Text>
        </View>
      </View>
      <Text style={{ height: 16, fontSize: 12, fontWeight: '400', color: '#B3B6B7', alignSelf: 'flex-start', position: 'relative', bottom: -10}}> Maitama, Abuja</Text>
    </View>
    { /* The text part */}
    <View style={{ height: height * 0.9, width, marginBottom: 15, paddingLeft: 25, paddingTop: 30 }}>
      <View style={{ maxHeight: height*0.3, width, marginBottom: 15 }}>
        <Text style={{ fontSize: 14, fontWeight: '600', color: '#626567', marginBottom: 8,}}> Responsibilities </Text>
        <Text style={{ fontSize: 12, fontWeight: '500', color: '#979A9A', maxWidth: width * 0.8, marginBottom: 5 }}> - Receives and manages clients</Text>
        <Text style={{ fontSize: 12, fontWeight: '500', color: '#979A9A', maxWidth: width * 0.8, marginBottom: 5 }}> - Receives and manages clients</Text>
        <Text style={{ fontSize: 12, fontWeight: '500', color: '#979A9A', maxWidth: width * 0.8, marginBottom: 5 }}> - Receives and manages clients</Text>
        <Text style={{ fontSize: 12, fontWeight: '500', color: '#979A9A', maxWidth: width * 0.8, marginBottom: 5 }}> - Receives and manages clients</Text>
    </View>
    { /* requirements  */}
    <View style={{ maxHeight: height*0.3, width, marginBottom: 15 }}>
      <Text style={{ fontSize: 14, fontWeight: '600', color: '#626567', marginBottom: 8,}}> Requirements and Skill </Text>
      <Text style={{ fontSize: 12, fontWeight: '500', color: '#979A9A', maxWidth: width * 0.8, marginBottom: 5  }}> - HND/B.Sc or its equivalent</Text>
      <Text style={{ fontSize: 12, fontWeight: '500', color: '#979A9A', maxWidth: width * 0.8, marginBottom: 5  }}> - 1 year work Experience</Text>
      <Text style={{ fontSize: 12, fontWeight: '500', color: '#979A9A', maxWidth: width * 0.8, marginBottom: 5  }}> - Excellent communication </Text>
      <Text style={{ fontSize: 12, fontWeight: '500', color: '#979A9A', maxWidth: width * 0.8, marginBottom: 5 }}> - Receives and manages clients</Text>
  </View>

  <View style={{ maxHeight: height*0.3, width, marginBottom: 15 }}>
    <Text style={{ fontSize: 14, fontWeight: '600', color: '#626567', marginBottom: 8,}}> Application Closing Date  </Text>
    <Text style={{ fontSize: 12, fontWeight: '500', color: '#979A9A', maxWidth: width * 0.8, marginBottom: 5  }}> { '30th May 2018'}</Text>
    </View>

    <View style={{ maxHeight: height*0.3, width, marginBottom: 30 }}>
      <Text style={{ fontSize: 14, fontWeight: '600', color: '#626567', marginBottom: 8,}}> Resume  </Text>
      <Text style={{ fontSize: 12, fontWeight: '500', color: '#979A9A', maxWidth: width * 0.8, marginBottom: 5 }}> { 'Email your resume to technical@booktu.org'}</Text>
      </View>

        <TouchableOpacity style={{ ...bigButton}}>
          <Text style={{ ...buttonText }}> APPLY </Text>
        </TouchableOpacity>
    </View>
  </View>
)

ShowCareer.navigatorButtons = {
  leftButtons: [
    {
      id: 'Sc.back.nav',
      component: 'Sc.Back.Button'
    }
  ]
}

export default ShowCareer
