import React from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from './styles';

/* eslint-disable max-len, object-curly-newline, no-undef */

const ResetPasswordComponent = (props) => {
  this.props = props;

  onNavigatorEvent = (e) => {
    if (e.type === 'NavBarButtonPress' && e.id === 'back.button') return this.props.navigator.pop();
  };

  this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);

  return (
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
      <ResetPasswordForm />
    </View>
  );
};


// main navigator properties;
ResetPasswordComponent.navigatorStyle = {
  navBarNoBorder: true
};

ResetPasswordComponent.navigatorButtons = {
  leftButtons: [{
    title: 'Back',
    id: 'back.button',
    buttonColor: '#82BE30',
    buttonFontSize: 15
  }]
};

/*  *********** SUB COMPONENTS TO BE REFACTORED ********  */

// reset password form
const ResetPasswordForm = () => (
  <View style={{ height: 100 }}>
    <TextInput style={styles.inputStyle} />
    <View style={styles.bigButton}>
      <Text style={styles.buttonText}> RESET PASSWORD </Text>
    </View>
  </View>
);

export default ResetPasswordComponent;
