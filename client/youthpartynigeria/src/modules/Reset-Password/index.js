import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { RequestPasswordReset } from '../../ops';
import { defaultGreen } from '../../mixins';
import styles from './styles';

/* eslint-disable max-len, object-curly-newline, no-undef */

class ResetPasswordComponent extends Component {
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
    this.state = {}
  }

  handleChange = (text) => this.setState({ email: text });

  handleSubmit = () => {
    console.log(this.state);
    RequestPasswordReset(this.state)(this.props.navigator)
  }

    render = () => (
      <View style={styles.base}>
      <View style={{ height: 150 }}>
        { /* Location for the logo */}
      </View>
      {/* Main text */}
      <View style={{ height: 50 }}>
        <Text style={styles.mainText}> Forgot your Password? </Text>
      </View>
      <View style={{ height: 50, paddingLeft: 10, marginTop: 15, marginBottom: 50 }}>
        <Text style={styles.smallText}> Enter your email or phone number to receive your password reset instructions </Text>
      </View>
      {/* End of Main text / Start of form and button  */}
      <ResetPasswordForm handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
    </View>
    ) 

}



// main navigator properties;
ResetPasswordComponent.navigatorStyle = {
  navBarNoBorder: true,
  navBarBackgroundColor: defaultGreen,
  statusBarTextColorScheme: 'light',
};

/*  *********** SUB COMPONENTS TO BE REFACTORED ********  */

// reset password form
const ResetPasswordForm = ({ handleSubmit, handleChange }) => (
  <KeyboardAvoidingView style={{ height: 100 }} behavior="height">
    <TextInput style={styles.inputStyle} onChangeText={handleChange}/>
    <TouchableOpacity style={styles.bigButton} onPress={handleSubmit}>
      <Text style={styles.buttonText}> RESET PASSWORD </Text>
    </TouchableOpacity>
  </KeyboardAvoidingView>
);

export default ResetPasswordComponent;
