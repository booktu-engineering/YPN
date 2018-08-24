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

  componentDidMount = () => {
    this.props.navigator.dismissLightBox();
    this.props.navigator.toggleTabs({ to: 'hidden', animated: false });
    this.props.navigator.setDrawerEnabled({ side: 'left', enabled: false });
  }
  componentWillUnmount = () => {
    const { navigator } = this.props;
    navigator.toggleTabs({ to: 'shown', animated: true });
    navigator.setDrawerEnabled({ side: 'left', enabled: true });
  }


render = () => <RenderPosition {...this.props} />;
}

const RenderPosition = ({ navigator, _entries, definition, renderFunctionMap, keys }) => (
  <View style={{ minHeight: height, width }}>
    <TinySelectors keys={keys} functionMap={renderFunctionMap}/>
    { definition ? composedCandidates(_entries)({ navigator, indicator: true }) : composedPositions(_entries)({ navigator }) }
  </View>
);

export default FilterableComponent(OpenPosition);
