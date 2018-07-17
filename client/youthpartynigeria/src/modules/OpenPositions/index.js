import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation'
import { View, Text, TouchableOpacity } from 'react-native';
import { BackIcon } from '../IconRegistry';
import { TinySelectors, height, width } from '../../mixins';
import { composedPositions, composedCandidates } from '../SingleCandidates';

class OpenPosition extends Component {
  constructor(props) {
    super(props);
    const { navigator } =  this.props;
    navigator.toggleTabs({ to: 'hidden', animated: true });
    navigator.setDrawerEnabled({ side: 'left', enabled: false });
    navigator.setButtons({
      leftButtons: [
        {
          id: 'Back.Nav',
      component: 'Back.Button'
        }
      ]
    })
  }

  componentDidMount = () => {
    Navigation.registerComponent('OS.Back.Button', () => this.backIcon)
  }

  backIcon = () => <BackIcon navigator={this.props.navigator} />

render = () => <RenderPosition nav={this.props.navigator} data={this.props}/>;
}

const RenderPosition = ({ nav, data }) => (
  <View style={{ minHeight: height, width }}>
    <TinySelectors keys={['Federal', 'Sort by date']}/>
    { data.definition ? composedCandidates([1,2,3,4,5,6,7,8])({ navigator: nav}) : composedPositions([1,2,3,4,5,6,7,8,9,10, 11, 12, 13, 14, 15])({ navigator: nav }) }
  </View>
)

export default OpenPosition
