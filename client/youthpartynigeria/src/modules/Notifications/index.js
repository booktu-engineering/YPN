import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, AsyncStorage } from 'react-native';
import MultipleNotifications from '../SingleNotification';
import { clearNotificationCount } from '../../actions/thunks/notifications';
import { height, width, defaultGreen } from '../../mixins';

class NotificationsComponent extends Component {
  constructor (props) {
    super(props);
    this.props.navigator.setButtons({
      leftButtons: [
        {
          id: 'Back.nav', 
          component: 'Back.Button', 
          passProps: {
            navigator: this.props.navigator
          }
        }
      ]
    })
  }

  componentDidMount = () =>  this.props.dispatch(clearNotificationCount());

    componentWillUnmount = () => {
        if(this.props.notifications && this.props.notifications.length) {
            this.props.dispatch({ type: 'UPDATE_LAST_SEEN_COUNT', payload: this.props.notifications[0].count });
            AsyncStorage.setItem('lastNotificationCount', this.props.notifications[0].count.toString());
          }
    }

    renderNotifications = () => MultipleNotifications(this.props.notifications)({ navigator: this.props.navigator, dispatch: this.props.dispatch, lastCount: this.props.lastSeenCount })
    render = () => (
        <View style={{
          flex: 1
        }}>
        { 
            this.props.notifications && this.props.notifications.length ? this.renderNotifications() : 
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#CACFD2', alignSelf: 'center', position: 'relative', bottom: -(height * 0.4) }}> Seems like there are no notifications </Text>
        }
        </View>
    )
}

NotificationsComponent.navigatorStyle = {
    navBarBackgroundColor: defaultGreen,
    statusBarTextColorScheme: 'light',
    preferredContentSize: { height: 2000 }, 
    navBarNoBorder: true,
    tabBarHidden: true
  };

const mapStateToProps = (state) => ({
  notifications: state.notifications.notifications,
  lastSeenCount: state.notifications.lastSeen,
  unseenCount: state.notifications.unseenCount
})

export default connect(mapStateToProps)(NotificationsComponent);

