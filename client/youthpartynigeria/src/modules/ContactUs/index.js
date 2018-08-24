import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { dispatchNotification } from '../../helpers/uploader';
import * as Components from './components';
import { defaultGreen } from '../../mixins'

class ContactUsPage extends Component {
  constructor(props) {
    super(props);
    const { navigator } = this.props;
    navigator.setButtons({
      leftButtons: [
        {
          id: 'Back.nav',
          component: 'Back.Button',
          passProps: {
            navigator,
            modal: true
          }
        }
      ]
    });
    this.state = {
        content: ''
    }
  }

  handleChange = (content) => this.setState({ content })

  handleSubmit = () => {
      if(!this.state.content.length) return dispatchNotification(this.props.navigator)('Please fill the form before submitting');
      this.setState({ content: '' });
      dispatchNotification(this.props.navigator)('Thank you. We would reach out');
      this.props.navigator.dismissModal();
  }

    render = () => (
      <View style={{ flex: 1, justifyContent: 'space-around', backgroundColor: '#F2F3F4', paddingLeft: 20, paddingTop: 20, paddingBottom: 15  }}>
          <Components.RenderDetailsOfYPN />
          <Components.RenderPhoneTing />
          <Components.RenderSubmitButton 
          value={this.state.content} 
          handleChange={this.handleChange} 
          handleSubmit={this.handleSubmit}/>
          <Text style={{ fontSize: 14, textAlign: 'center' }}>
          Follow us @YouthPartyng
          </Text>
          { Components.IconDirectory(this.props.navigator)}
        </View>
    )
}

ContactUsPage.navigatorStyle = {
  navBarBackgroundColor: defaultGreen,
  statusBarTextColorScheme: 'light',
  tabBarHidden: false
};

export default ContactUsPage;
