import { View, Text, Image, TextInput } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React from 'react';
import styles from './styles';


const LoginComponent = ({ navigator }) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.imageContainer}>
        <Image style={{ flex: 1 }} source={{ uri: 'https://images.unsplash.com/photo-1525896967401-bee10dc2276d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f3df2a8c993701d7b2127b3779da2575&auto=format&fit=crop&w=1094&q=80' }} />
        <LinearGradient colors={['transparent', '#13131390']} locations={[0, 0.9]} style={styles.textDrop}>
          <Text style={styles.header1}> Welcome to Youth Party </Text>
          <Text style={styles.header2}> Seeking to serve and unite Nigerians </Text>
        </LinearGradient>
      </View>
      { /* Place holder for the form */}
      <View style={styles.formHolder}>
        <LoginForm />
      </View>
      <BigButton content='LOGIN' />
      {/* Login/ Reset password Section */}
      <View style={styles.container}>
        <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row' }}>
          <Text style={{ fontSize: 13, color: '#2F2E2E' }}>Sign Up</Text>
          <Text style={{ fontSize: 13, color: '#2F2E2E' }} onPress={() => { navigator.push({ screen: 'Reset.Password' })}}> Forgot Password?</Text>
        </View>
        <View style={{ flex: 1, marginTop: -70 }}>
          <Text style={{ color: '#2F2E2E' }}> By logging in, you agree to our <Text style={{ color: '#82BE30' }}>Privacy Policy</Text> & <Text style={{ color: '#82BE30'}}>Terms of Service</Text></Text>
        </View>
      </View>
    </View>
  );
};

const LoginForm = () => { // eslint-disable-line
  return (
    <View style={{ flex: 1 }}>
      { /* form body starts here */}
      <View style={styles.formContainer}>
        <Text style={styles.formLabel}> USERNAME</Text>
        <TextInput style={styles.formItem} />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.formLabel}> PASSWORD</Text>
        <TextInput style={styles.formItem} />
      </View>
      { /* form body ends here here */}
    </View>
  );
};


const BigButton = ({ content }) => {
  return (
    <View style={ styles.buttonContainer }>
      <Text style={styles.buttonContent}>{ content }</Text>
    </View>
  )
}

LoginComponent.navigatorStyle = {
  navBarHidden: true
}
export default LoginComponent
