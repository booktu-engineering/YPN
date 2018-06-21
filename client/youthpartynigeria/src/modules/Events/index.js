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
  }

  componentDidMount = () => {
    Navigation.registerComponent('E.Back.Button', () => this.backIcon)
    Navigation.registerComponent('E.Search.Button', () => this.searchIcon)
  }

  componentWillUnmount = () => {
    this.props.navigator.setDrawerEnabled({ side: 'left', enabled: true });
    this.props.navigator.toggleTabs({ to: 'shown', animated: true });
  }

  backIcon = () => <BackIcon navigator={this.props.navigator} />
  searchIcon = () => <SearchIcon navigator={this.props.navigator} />



render = () => <EventComponent navigator={this.props.navigator}/>
}

EventScreen.navigatorButtons = {
  leftButtons: [
    {
      id: 'Back.Nav',
      component: 'E.Back.Button',
      passProps: {
        nav
      }
    }
  ],
  rightButtons: [
    {
      id: 'E.Search.Nav',
      component: 'Search.Button',
      passProps: {
        nav
      }
    }
  ]
}

export default EventScreen
