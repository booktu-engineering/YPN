import React, { Component } from 'react'
import { Navigation } from 'react-native-navigation'
import { View, Text } from 'react-native';
import { Selectors, height, TinySelectors  } from '../../mixins';
import { MultipleEvents } from '../SingleEvent';
import { BackIcon, SearchIcon } from '../IconRegistry';

let nav

const EventComponent = ({ navigator }) =>  (
    <View style={{ minHeight: height}}>
      <Selectors keys={['Events', 'Town Hall']}/>
      <TinySelectors keys={[ 'Federal', 'Time']} />
      { MultipleEvents([1,2,3,4,5,6,7])({ navigator, screen: 'Show.Event'})}
  </View> )

class EventScreen extends Component {
  constructor(props) {
    super(props)
    const { navigator } =  this.props
    navigator.toggleTabs({ to: 'hidden', animated: true });
    navigator.setDrawerEnabled({ side: 'left', enabled: false });
    this.props.navigator.setButtons({
      leftButtons: [
        {
          id: 'back.button', 
          component: 'Back.Button', 
          passProps: {
            navigator: this.props.navigator
          }
        }
      ],
      rightButtons: [
        {
          id: 'back.back.search', 
          component: 'Search.Button',
          passProps: {
            navigator: this.props.navigator
          }
        }
      ]
    })
  }

  componentWillUnmount = () => {
    this.props.navigator.setDrawerEnabled({ side: 'left', enabled: true });
    this.props.navigator.toggleTabs({ to: 'shown', animated: true });
  }

  backIcon = () => <BackIcon navigator={this.props.navigator} />
  searchIcon = () => <SearchIcon navigator={this.props.navigator} />



render = () => <EventComponent navigator={this.props.navigator}/>
}


export default EventScreen
