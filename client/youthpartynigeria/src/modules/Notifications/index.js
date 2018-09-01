import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, AsyncStorage } from 'react-native';
import MultipleNotifications from '../SingleNotification';
import { clearNotificationCount } from '../../actions/thunks/notifications';
import { height, width, defaultGreen } from '../../mixins';
import { ComposedCareers } from '../SingleCareer';

class NotificationsComponent extends Component {
  constructor (props) {
    super(props);
    this.props.navigator.setButtons({
      leftButtons: [
        {
          id: 'Back.nav', 
          component: 'Back.Button', 
          passProps: {
            navigator: this.props.navigator, 
            modal: true
          }
        }
      ], 
      rightButtons: [
        {
          id: 'Back.nav', 
          component: 'Search.Button', 
          passProps: {
            navigator: this.props.navigator, 
            dispatch: this.props.dispatch
          }
        }
      ]
    })
  }
    componentDidMount = () => {
      dispatch(clearNotificationCount());
      if(this.props.notifications && this.props.notifications.length) {
        dispatch({ type: 'UPDATE_LAST_SEEN_COUNT', payload: this.props.notifications[0].count });
        AsyncStorage.setItem('lastNotificationCount', this.props.notifications[0].count.toString());
      }
    }

    renderNotifications = () => MultipleNotifications(this.props.notifications)({ navigator: this.props.navigator, dispatch: this.props.dispatch, lastCount: this.props.lastSeenCount })
    render = () => (
        <View style={{
          flex: 1
        }}>
        { this.props.notifications && this.props.notifications.length && this.renderNotifications() }
        { (!this.props.notifcations || !this.props.notifications.length) && <Text> Seems like there are no notifications </Text> }
        </View>
    )
}

NotificationsComponent.navigatorStyle = {
    navBarBackgroundColor: defaultGreen,
    statusBarTextColorScheme: 'light',
    preferredContentSize: { height: 2000 }, 
    navBarNoBorder: true
  };

const mapStateToProps = (state) => ({
  notifications: state.notifications.notifications,
  lastSeenCount: state.notifications.lastSeen
})

export default connect(mapStateToProps)(NotificationsComponent);

