import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation'
import { View } from 'react-native';
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
      component: 'Back.Button', 
      passProps: {
        navigator: this.props.navigator
      }
        }
      ]
    })
  }

  componentDidMount = () => {
    console.log(this.props);
  }


render = () => <RenderPosition {...this.props}/>;
}

const RenderPosition = ({ navigator, data }) => (
  <View style={{ minHeight: height, width }}>
    <TinySelectors keys={['Federal', 'Sort by date']}/>
    { data.definition ? composedCandidates(data)({ navigator }) : composedPositions(data)({ navigator }) }
  </View>
)

export default OpenPosition
