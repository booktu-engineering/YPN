import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { BackIcon } from '../IconRegistry';
import { View, Text, TouchableOpacity } from 'react-native';
import { height, width, bigButton, buttonText } from '../../mixins'

class CandidateScreen extends Component {
  constructor(props) {
    super(props)
    const { navigator } =  this.props
    navigator.toggleTabs({ to: 'hidden', animated: true });
    navigator.setDrawerEnabled({ side: 'left', enabled: false });
    this.props.navigator.setButtons({
      leftButtons: [
        {
          id: 'Back.button', 
          component: 'Back.Button', 
          passProps: {
            navigator: this.props.navigator
          }
        }
      ]
    });
  }


  componentWillUnmount = () => {
    this.props.navigator.setDrawerEnabled({ side: 'left', enabled: true });
    this.props.navigator.toggleTabs({ to: 'shown', animated: true });
  }

  backIcon = () => <BackIcon navigator={this.props.navigator} />

  render = () => <RenderCandidate  navigator={this.props.navigator}/>
}

const RenderCandidate = ({ navigator  }) => (
  <View style={{ flex: 1}}>
    { /* render the activities thing */}
    <View style={{ height: height * 0.43, width, justifyContent: 'center' }}>
      <TouchableOpacity  onPress={() => navigator.push({ screen: 'Open.Position', title: 'Aspirants', passProps: { definition: 1} })} style={{ height: height * 0.13, paddingLeft: 15, paddingRight: 15, justifyContent: 'center', borderColor: '#B3B6B750', position: 'relative', borderBottomWidth: 0.3 }}>
        <Text style={{ fontSize: 15, fontWeight: '600', color:'#626567', marginBottom: 10 }}>Aspirants</Text>
        <Text style={{ fontSize: 13, fontWeight: '500', color:'#B3B6B7'}}>Click to see approved parties </Text>
        <Text  style={{ fontSize: 13, fontWeight: '500', color: '#B3B6B7', position: 'absolute', top: ((height * 0.15) * 0.25), right: 15 }}>View</Text>
      </TouchableOpacity>
      { /* Run for office */}
      <TouchableOpacity style={{ height: height * 0.15, paddingLeft: 15, paddingRight: 15, justifyContent: 'center', borderColor: '#B3B6B750', position: 'relative', borderBottomWidth: 0.3 }} onPress={() => { navigator.push({ screen: 'Open.Position', title: 'Run For Office', passProps: { definition: 2 }} )}}>
        <Text style={{ fontSize: 15, fontWeight: '600', color:'#626567', marginBottom: 10 }}> Run For Office </Text>
        <Text style={{ fontSize: 13, fontWeight: '500', color:'#B3B6B7'}}> Apply to run for office </Text>
        <Text  style={{ fontSize: 13, fontWeight: '500', color: '#B3B6B7', position: 'absolute', top: ((height * 0.15) * 0.25), right: 15 }}>View</Text>
      </TouchableOpacity>
      { /* Sponsored Candidates */}
      <TouchableOpacity onPress={() => { navigator.push({ screen: 'Open.Position', title: 'Sponsored Candidates', passProps: { definition: 3 }} )}} style={{ height: height * 0.15, paddingLeft: 15, paddingRight: 15, justifyContent: 'center', borderColor: '#B3B6B750', position: 'relative', borderBottomWidth: 0.3 }}>
        <Text style={{ fontSize: 15, fontWeight: '600', color:'#626567', marginBottom: 10 }}> Sponsored Candidates </Text>
        <Text style={{ fontSize: 13, fontWeight: '500', color:'#B3B6B7'}}> Click to view all candidates </Text>
        <Text style={{ fontSize: 13, fontWeight: '500', color: '#B3B6B7', position: 'absolute', top: ((height * 0.15) * 0.25), right: 15 }}>View</Text>
      </TouchableOpacity>
    </View>
    { /* open positions button at the bottom */}
    <TouchableOpacity style={{ ...bigButton, position: 'absolute', bottom: 15 }} onPress={() => { navigator.push({ screen: 'Open.Position', title: 'Open Positions'})}}>
      <Text style={{ ...buttonText }}> OPEN POSITIONS </Text>
    </TouchableOpacity>
  </View>
)



export default CandidateScreen;
