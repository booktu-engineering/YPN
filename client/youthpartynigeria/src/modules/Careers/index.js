import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { View, Text } from 'react-native';
import { BackIcon } from '../IconRegistry';
import { height, width, TinySelectors, Selectors } from '../../mixins/'
import { ComposedCareers } from '../SingleCareer';

class Careers extends Component {
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
            navigator
          }
        }
      ]
    });
  }
  componentDidMount = () => {
    Navigation.registerComponent('C.Back.Button', () => this.backIcon)
  }

  backIcon = () => <BackIcon navigator={this.props.navigator} />

  componentWillUnmount = () => {
    this.props.navigator.setDrawerEnabled({ side: 'left', enabled: true });
    this.props.navigator.toggleTabs({ to: 'shown', animated: true });
  }

  render = () => <RenderCareers navigator={this.props.navigator}/>
}


const RenderCareers = ({ navigator }) => (
  <View style={{ height: height * 1.8 }}>
    <Selectors keys={['Vacancies', 'Voluntary']}/>
    <View style={{ height: height * 0.9, width }}>
      <TinySelectors keys={['Federal']}/>
      { ComposedCareers([1,2,3,4,5,6,7])({ navigator })}
    </View>
</View>
)


export default Careers
