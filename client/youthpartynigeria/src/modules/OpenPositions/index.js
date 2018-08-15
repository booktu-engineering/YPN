import React, { Component } from 'react';
import { View } from 'react-native';
import { TinySelectors, height, width } from '../../mixins';
import { composedPositions, composedCandidates } from '../SingleCandidates';

class OpenPosition extends Component {
  constructor(props) {
    super(props);
    const { navigator } = this.props;
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
    });
  }

  componentWillUnmount = () => {
    this.props.navigator.toggleTabs({ to: 'shown', animated: true });
    this.props.navigator.setDrawerEnabled({ side: 'left', enabled: true });
  }

render = () => <RenderPosition {...this.props} />;
}

const RenderPosition = ({ navigator, data, definition }) => (
  <View style={{ minHeight: height, width }}>
    <TinySelectors keys={['Federal', 'Sort by date']} />
    { definition ? composedCandidates(data)({ navigator, indicator: true }) : composedPositions(data)({ navigator }) }
  </View>
);

export default OpenPosition;
