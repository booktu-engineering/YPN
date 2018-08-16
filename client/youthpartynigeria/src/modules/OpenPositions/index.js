import React, { Component } from 'react';
import FilterableComponent from '../../hocs';
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
            navigator
          }
        }
      ]
    });
  }

  componentWillUnmount = () => {
    const { navigator } = this.props;
    navigator.toggleTabs({ to: 'shown', animated: true });
    navigator.setDrawerEnabled({ side: 'left', enabled: true });
  }


render = () => <RenderPosition {...this.props} />;
}

const RenderPosition = ({ navigator, _entries, definition, renderFunctionMap }) => (
  <View style={{ minHeight: height, width }}>
    <TinySelectors keys={['Federal', 'State', 'Local']} functionMap={renderFunctionMap}/>
    { definition ? composedCandidates(_entries)({ navigator, indicator: true }) : composedPositions(_entries)({ navigator }) }
  </View>
);

export default FilterableComponent(OpenPosition);
