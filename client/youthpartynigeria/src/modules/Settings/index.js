import React, { Component } from 'react';
import OneSignal from 'react-native-onesignal';
import { connect } from 'react-redux';
import { View, Text, Switch, TouchableOpacity, AsyncStorage, AlertIOS } from 'react-native';
import { dispatchNotification, StartProcess, EndProcess } from '../../helpers/uploader';
import UserActions from '../../actions/thunks/user';
import { width } from '../../mixins';
import RenderScreen from '../../hocs/renderScreens';

class SettingsScreen extends Component {
    state = {
      value: true
    }

    componentDidMount = () => {
      AsyncStorage.getItem('NotificationSubscriptionStatus')
        .then((value) => {
          if (!value) this.setState({ value: true });
          const subscriptionValue = JSON.parse(value);
          this.setState({ value: subscriptionValue });
        });
    }

    handleChange = (value) => {
      this.setState({ value });
      StartProcess(this.props.navigator);
      AsyncStorage.setItem('NotificationSubscriptionStatus', JSON.stringify(value))
        .then(() => {
          OneSignal.setSubscription(value);
          EndProcess(this.props.navigator);
          dispatchNotification(this.props.navigator)(!value ? 'You wont recieve any more notifications' : 'You\'re all set up to receive notifications now!');
        })
        .catch((err) => {
          OneSignal.setSubscription(true);
          EndProcess(this.props.navigator);
          dispatchNotification(this.props.navigator)('Something went wrong and we couldnt complete that action');
        });
    }

    handlePasswordReset = () => {
      const handlePress = (password) => {
        const user = { user: { email: this.props.user.email, password } };
        this.props.dispatch(UserActions.LogInThunk(user, '2')(this.props.navigator))
          .then((status) =>{ 
            status && this.props.navigator.push({ screen: 'Update.Profile', title: 'Set your password', passProps: { passwordOnly: true } })
            !status && dispatchNotification(this.props.navigator)('Sorry we couldnt verify your authenticity')
          })
      };
      AlertIOS
        .prompt(
          'Enter your current password',
          '',
          [{
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel'
          },
          {
            text: 'Ok',
            onPress: handlePress
          }],
          'secure-text'
        );
    }

    render = () => (
      <View style={{ flex: 1, paddingLeft: 20 }}>
          <View
            style={{
              height: 50,
              width,
              flexDirection: 'row',
              flexWrap: 'nowrap',
              justifyContent: 'space-around',
              borderBottomWidth: 0.5,
              borderBottomColor: '#F2F3F4',
              marginBottom: 10
            }}
          >
              <Text style={{ position: 'relative', left: -35 }}>

        Toggle Notifications
            </Text>
              <Switch
                value={this.state.value}
                onValueChange={this.handleChange}
              />
            </View>
          <TouchableOpacity
            style={{
              height: 50,
              width,
              flexDirection: 'row',
              flexWrap: 'nowrap',
              justifyContent: 'flex-start',
              borderBottomWidth: 0.5,
              borderBottomColor: '#F2F3F4',
              marginBottom: 10,
              paddingLeft: 10
            }}
            onPress={this.handlePasswordReset}
          >
              <Text>
             Change Password
            </Text>
            </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: 50,
              width,
              flexDirection: 'row',
              flexWrap: 'nowrap',
              justifyContent: 'flex-start',
              borderBottomWidth: 0.5,
              borderBottomColor: '#F2F3F4',
              marginBottom: 10,
              paddingLeft: 10
            }}
            onPress={() => this.props.navigator.push({ screen: 'Subscribe.NewsLetter', title: 'Subscribe to our Newsletter' })}
          >
              <Text>
                Subscribe To Our NewsLetter
                </Text>
            </TouchableOpacity>

        </View>
    )
}

export default connect(state => ({ user: state.users.current }))(RenderScreen(SettingsScreen)({ modal: true }));
