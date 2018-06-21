import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { BackIcon, SearchIcon, } from '../modules/IconRegistry/';

class BaseScreen extends Component {
  constructor(props, backButton, searchButton) {
    Navigation.registerComponent(backButton, () => this.backIcon)
    super(props)
    const { navigator } = this.props;
    navigator.toggleTabs({ to: 'hidden', animated: true });
    navigator.setDrawerEnabled({ side: 'left', enabled: false });
    if(searchButton) return Navigation.registerComponent(searchButton, () => this.searchIcon)
  }

  componentWillUnmount = () => {
    this.props.navigator.setDrawerEnabled({ side: 'left', enabled: true });
    this.props.navigator.toggleTabs({ to: 'shown', animated: true });
  }

  backIcon = () => <BackIcon navigator={this.props.navigator} />

searchIcon = () => <SearchIcon navigator={this.props.navigator} />
}

export default BaseScreen;
