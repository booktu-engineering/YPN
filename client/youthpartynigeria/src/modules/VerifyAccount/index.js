import React from 'react';
import { View, Text, Image, TextInput } from 'react-native';
import { bigButton, buttonText, inputStyle, height, width } from '../../mixins/';
import styles from './styles';

/* eslint max-len: 0, object-curly-newline: 0 */
const VerifyComponent = ({ navigator }) => (
  <View style={{ flex: 1, alignItems: 'center', paddingTop: 50 }}>
    <View style={styles.imageHolder}>
      <Image />
      <Text style={styles.mainText}> Complete Verification </Text>
    </View>
    <Text style={styles.promptText}> Please enter the verification code sent to +234 801 234 5678</Text>
    <View style={{ height: height * 0.2, marginTop: -20 }}>
      <TextInput style={{ ...inputStyle, marginBottom: 50 }} />
      <View style={{ ...bigButton }}>
        <Text style={{ ...buttonText }} onPress={() =>  navigator.push({ screen: 'Declare.Interest' })}> VERIFY ACCOUNT </Text>
      </View>
    </View>
    <Text style={{ color: '#2F2E2E', position: 'absolute', bottom: 50, textAlign: 'center', width: width * 0.7 }}> By logging in, you agree to our <Text style={{ color: '#82BE30' }}>Privacy Policy</Text> & <Text style={{ color: '#82BE30' }}>Terms of Service</Text></Text>
  </View>
)

// styling the navigator

VerifyComponent.navigatorStyle = {
  navBarNoBorder: true
};

VerifyComponent.navigatorButtons = {
  leftButtons: [{
    title: 'Back',
    id: 'back.button',
    buttonColor: '#82BE30',
    buttonFontSize: 15
  }]
};


export default VerifyComponent
