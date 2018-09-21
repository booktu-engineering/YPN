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
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
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

    this.state = {keys: ['Federal', 'State', 'Local']};
  }

  onNavigatorEvent = (e) => {
    if(e.id === 'didAppear') {
      this.forceUpdate = true;
      this.setState({ keys: ['Federal', 'State', 'Local']})
    }
  }

  componentDidUpdate = (prevProps) => {
    if(this.forceUpdate) {
      this.forceUpdate = false;
      return;
    }
    if(JSON.stringify(this.props.keys) !== JSON.stringify(['Federal', 'State', 'Local'])) {
      if(JSON.stringify(this.props.keys) !== JSON.stringify(this.state.keys)){

      this.setState({ keys: this.props.keys })
      }
    }
  }

  

  componentDidMount = () => {
    this.props.navigator.dismissLightBox();
  }
  componentWillUnmount = () => {
    const { navigator } = this.props; 
    this.state.keys = []     
    navigator.toggleTabs({ to: 'shown', animated: true });
    navigator.setDrawerEnabled({ side: 'left', enabled: true });
  }


render = () => <RenderPosition {...this.props} keysX={this.state.keys} />;
}

const RenderPosition = ({ navigator, _entries, definition, renderFunctionMap, keysX }) => (
  <View style={{ flex: 1 }}>
    <TinySelectors keys={keysX} functionMap={renderFunctionMap}/>
    { definition ? composedCandidates(_entries)({ navigator, indicator: true }) : composedPositions(_entries)({ navigator }) }
  </View>
);

OpenPosition.navigatorStyle = {
  tabBarHidden: true
}
export default FilterableComponent(OpenPosition);
