import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Selectors, TinySelectors } from '../../mixins';
import { MultipleEvents } from '../SingleEvent';
import { fetchAllEvents } from '../../actions/thunks/events';

const EventComponent = ({ navigator, dispatch, data }) => (
  <View style={{ flex: 1 }}>
    <Selectors keys={['Events', 'Town Halls']} />
    { MultipleEvents(data)({ navigator, screen: 'Show.Event', dispatch })}
  </View>);

class EventScreen extends Component {
  constructor(props) {
    super(props);
    const { navigator } = this.props;
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

  componentDidMount = () => {
    if (!this.props.events) return this.props.dispatch(fetchAllEvents(this.props.navigator));
    // asynchronously dispatch to fetch all the events belonging to the user    
    return this.props.dispatch(fetchAllEvents(this.props.navigator));
  }

render = () => (
  <View style={{ flex: 1 }}>
    { this.props.events ? <EventComponent data={this.props.events} navigator={this.props.navigator} dispatch={this.props.dispatch}/> : null }
  </View>
)
}

EventScreen.navigatorStyle = {
  tabBarHidden: true
};

const mapStateToProps = state => ({
  events: state.events.all
});

export default connect(mapStateToProps)(EventScreen);
