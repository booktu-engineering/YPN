import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import React, { Component } from 'react';
import styles from './styles';
import { navigatorObject } from '../../navigation/'
import userActions from '../../actions/thunks/user';

const { LogInThunk } = userActions;



class LoginContainer extends Component {
  state = {}
  handleChange = (value, name) => this.setState({ [name]: value });
  handleSubmit = () => this.props.dispatch(LogInThunk(this.state)(this.props.navigator))
  render = () => <LoginComponent navigator={this.props.navigator} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
}

const LoginComponent = ({ navigator, handleSubmit, handleChange }) => {
  navigator.setButtons({
    leftButtons: [
      {
        id: 'Login.bav', 
        component: 'Back.Button', 
        passProps: {
          navigator
        }
      }
    ]
  })
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.imageContainer}>
        <Image style={{ flex: 1 }} source={{ uri: 'https://images.unsplash.com/photo-1461155264347-f1450307af27?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f5c7db13e13c0a358c5ecc7d8342a811&auto=format&fit=crop&w=2850&q=80' }} />
        <LinearGradient colors={['transparent', '#13131390']} locations={[0, 0.9]} style={styles.textDrop}>
          <Text style={styles.header1}> Welcome to Youth Party </Text>
          <Text style={styles.header2}> Seeking to serve and unite Nigerians </Text>
        </LinearGradient>
      </View>
      { /* Place holder for the form */}
      <View style={styles.formHolder}>
        <LoginForm  handleChange={handleChange} />
      </View>
      <BigButton  handleSubmit={handleSubmit} navigator={navigator} content='LOGIN' />
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

const LoginForm = ({ handleChange }) => { // eslint-disable-line
  return (
    <View style={{ flex: 1 }}>
      { /* form body starts here */}
      <View style={styles.formContainer}>
        <Text style={styles.formLabel}> EMAIL </Text>
        <TextInput style={styles.formItem} onChangeText={(text) => handleChange(text, 'email')} />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.formLabel}> PASSWORD</Text>
        <TextInput style={styles.formItem}
          secureTextEntry={true}
          onChangeText={(text) => handleChange(text, 'password')}
          />
      </View>
      { /* form body ends here here */}
    </View>
  );
};


const BigButton = ({ content, handleSubmit }) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={handleSubmit}>
      <Text style={styles.buttonContent}>{ content }</Text>
    </TouchableOpacity>
  )
}

LoginContainer.navigatorStyle = {
  navBarHidden: true,
  statusBarTextColorScheme: 'light'
}
export default connect()(LoginContainer)
