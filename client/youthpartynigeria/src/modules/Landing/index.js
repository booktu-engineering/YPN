import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles, { width } from './styles'

const imageUrl = 'https://res.cloudinary.com/dy8dbnmec/image/upload/v1535072474/logo.png';
const LandingComponent = ({ navigator }) => (
  <View style={styles.base}>
    <View style={styles.logoContainer}>
      { /* this should contain the logo */}
      <Image source={{ uri: imageUrl }} style={{ alignSelf: 'center', height: 140, width: 150, resizeMode: 'center', position: 'relative', }}/>
    </View>
    {/* Start of the Welcome to youth party text */}
    <View style={styles.textContainer} >
      <Text style={styles.largeText}> Welcome to Youth Party </Text>
      <Text style={styles.mediumText}> Seeking to serve and unite Nigerians</Text>
    </View>
    {/* Button Stack */}
    <View style={styles.buttonStack}>
      <TouchableOpacity onPress={() => { navigator.push({ screen: 'Login.Component' })}} style={styles.bigButtonBlue}>
        <Text style={styles.buttonText}> LOG IN </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.bigButton} onPress={() => { navigator.push({ screen: 'SignUp.Component', title: 'Registration' })}}>
        <Text style={styles.buttonText}> SIGN UP WITH EMAIL </Text>
      </TouchableOpacity>
      <Text style={{ color: '#2F2E2E', textAlign: 'center' }}>Already a member? Click to <Text style={{ color: '#82BE30' }} onPress={() => { navigator.push({ screen: 'Login.Component' })}}>Log in</Text></Text>
    </View>
    {/* end of button stack */}
    <Text style={{ color: '#2F2E2E', textAlign: 'center', width: width * 0.6, position: 'absolute', bottom: 70 }}> By signing up, you agree to our <Text style={{ color: '#82BE30' }} onPress={() => navigator.showModal({ screen: 'Web.Page', title: 'Privacy Policy', passProps: { source: 'https://youthpartyng.com/about-us/'}})}>Privacy Policy</Text> & <Text onPress={() => navigator.showModal({ screen: 'Web.Page', title: 'Terms of Service', passProps: { source: 'https://youthpartyng.com/about-us/'}})} style={{ color: '#82BE30'}}>Terms of Service</Text></Text>
  </View>
);

LandingComponent.navigatorStyle = {
  navBarHidden: true
};

export default LandingComponent;
