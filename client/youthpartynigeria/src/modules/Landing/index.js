import React from 'react';
import { View, Text } from 'react-native';
import styles, { width } from './styles'

const LandingComponent = ({ navigator }) => (
  <View style={styles.base}>
    <View style={styles.logoContainer}>
      { /* this should contain the logo */}
    </View>
    {/* Start of the Welcome to youth party text */}
    <View style={styles.textContainer} >
      <Text style={styles.largeText}> Welcome to Youth Party </Text>
      <Text style={styles.mediumText}> Seeking to serve and unite Nigerians</Text>
    </View>
    {/* Button Stack */}
    <View style={styles.buttonStack}>
      <View style={styles.bigButtonBlue}>
        <Text style={styles.buttonText} onPress={() => { navigator.push({ screen: 'Verify.Component' })}}> SIGN UP WITH FACEBOOK </Text>
      </View>
      <View style={styles.bigButton}>
        <Text style={styles.buttonText} onPress={() => { navigator.push({ screen: 'SignUp.Component', title: 'Registration' })}}> SIGN UP WITH EMAIL </Text>
      </View>
      <Text style={{ color: '#2F2E2E', textAlign: 'center' }}>Already a member? Click to <Text style={{ color: '#82BE30' }} onPress={() => { navigator.push({ screen: 'Login.Component' })}}>Log in</Text></Text>
    </View>
    {/* end of button stack */}
    <Text style={{ color: '#2F2E2E', textAlign: 'center', width: width * 0.6, position: 'absolute', bottom: 70 }}> By signing up, you agree to our <Text style={{ color: '#82BE30' }}>Privacy Policy</Text> & <Text style={{ color: '#82BE30'}}>Terms of Service</Text></Text>
  </View>
);

LandingComponent.navigatorStyle = {
  navBarHidden: true
};

export default LandingComponent;
