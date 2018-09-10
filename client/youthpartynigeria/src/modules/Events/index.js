import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Selectors, TinySelectors } from '../../mixins';
import FilterableComponent from '../../hocs';
import { EndProcess } from '../../helpers/uploader';
import { MultipleEvents } from '../SingleEvent';
import { fetchAllEvents } from '../../actions/thunks/events';

const EventComponent = () => {
  const ComponentX = (props) => {
    const { navigator, dispatch, _entries, keys, renderFunctionMap } = props;
    return  (
      <View style={{ flex: 1 }}>
        {/* <Selectors keys={['Events', 'Town Halls']} /> */}
        <TinySelectors keys={keys} functionMap={renderFunctionMap} />
        { MultipleEvents(_entries)({ navigator, screen: 'Show.Event', dispatch })}
      </View>);
  }
  return FilterableComponent(ComponentX, [ 'Federal', 'State' ], 'details');
};


class EventScreen extends Component {
  constructor(props) {
    super(props);
    const { navigator } = this.props;
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    navigator.setDrawerEnabled({ side: 'left', enabled: false });
    navigator.setButtons({
      leftButtons: [
        {
          id: 'back.button',
          component: 'Back.Button',
          passProps: {
            navigator
          }
        }
      ],
      rightButtons: [
        {
          id: 'back.back.search',
          component: 'Search.Button',
          passProps: {
            navigator
          }
        }
      ]
    });
  }

  onNavigatorEvent = (e) => {
    if (e.id === 'didAppear' && this.props.entries) return this.props.navigator.dismissLightBox();
  }

  componentDidMount = () => {

    if (!this.props.entries) {
      this.props.dispatch(fetchAllEvents(this.props.navigator))
      .then(() => EndProcess(this.props.navigator));
    }
    // asynchronously dispatch to fetch all the events belonging to the user    
    this.props.dispatch(fetchAllEvents(this.props.navigator))
    .then(() => EndProcess(this.props.navigator));
  }

render = () => (
  <View style={{ flex: 1 }}>
    { this.props.entries ? React.createElement(EventComponent(), this.props, null) : null }
  </View>
)
}

EventScreen.navigatorStyle = {
  tabBarHidden: true
};

const mapStateToProps = state => ({
  entries: state.events.all || []
});

export default connect(mapStateToProps)(EventScreen);
