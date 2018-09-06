import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, TextInput, Picker, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { defaultGreen, inputStyle, formContainer, width, height, bigButton, buttonText, formHolder, formLabel } from '../../mixins/';
import styles from './styles';
import userActions from '../../actions/thunks/user';
import { dispatchNotification, SingleUpload } from '../../helpers/uploader';
import states from './states';

const { SignUpThunk } = userActions;


/* eslint jsx-quotes: 0, max-len: 0, object-curly-newline: 0 */

class SignUpComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movingForward: false,
      keys: [],
      selectedLga: [],
      avatar: 'https://ht-cdn.couchsurfing.com/assets/profile-picture-placeholder.png'
    };
    this.props.navigator.setButtons({
      leftButtons: [
        {
          id: 'SignUp.Nav', 
          component: 'Back.Button',
          passProps: {
            func: this.handleNavigationOp
          }
        }
      ]
    })
    this.renderStates();
  }

  handleNavigationOp = () => {
    if(this.state.movingForward) return this.setState({ movingForward: false });
    this.props.navigator.pop(); 
  }

  handleChange = (value, name) => { 
    this.setState({ [name]: value }) 
    if(name === 'state') {
      const target = states.filter(state => state.state.name === value)
      const selectedTarget = target[0].state.locals.map(lga => ({ label: lga.name, value: lga.name }));
      this.setState({ selectedLga: selectedTarget });

    }
  }

  handleClickLink = () => {
    this.props.navigator.showModal({
      screen: 'Web.Page', 
      title: "https://govote.ng/status",
      navigatorStyle: {
        navBarBackgroundColor: defaultGreen,
      statusBarTextColorScheme: 'light',
      },
      passProps: {
        source: "https://govote.ng/status"
      }
    })
  }

  handleSubmit = () => {
  if(!this.__filterState()) return dispatchNotification(this.props.navigator)('All fields are required, thank you');
    const username = `${this.state.name.split(' ')[0].toLowerCase()}.${this.state.name.split(' ')[1].toLowerCase()}`
   return this.props.dispatch(SignUpThunk({ user: { ...this.state, firstname: this.state.name.split(' ')[0], lastname: this.state.name.split(' ')[1], username }})(this.props.navigator))
  }

  __filterState = () => {
    if(!this.state.name || !this.state.email || !this.state.password || !this.state.dob || !this.state.password || !this.state.state || !this.state.lga || !this.state.ward || !this.state.phone) return false;
    return true;
  }

// wrap in a try catch to avoid unhandled exceptions;
  selectImage = () => {
    try {
      SingleUpload()
        .then((url) => {
          this.setState({ avatar: url });
        });
    } catch (e) {
      console.log(e);
    }
  }

  handleNavigation = () => {
    if (this.state.movingForward) return this.handleSubmit();
    this.setState({ movingForward: !this.state.movingForward });
  }

  renderStates = () => {
    const keys = states.map(item => ({ label: item.state.name, value: item.state.name }));
    this.state.keys = keys;
  }

  render = () => (
    <View style={{ flex: 1 }}>
      {/* This should contain the green bar and the image */}
      <View style={styles.greenBar}>
        <View style={styles.ImageHolder}>
          <Image style={styles.Image} source={{ uri: this.state.avatar }} />
          <TouchableOpacity style={styles.textHolder} onPress={this.selectImage}>
            <Text style={styles.smallText}> Change Photo</Text>
          </TouchableOpacity>
        </View>
      </View>
      { /* end of the green bar */}
      { this.state.movingForward ? <SignUpFormNext state={this.state} handleChange={this.handleChange} /> : <SignUpForm state={this.state} handleChange={this.handleChange} handleClick={this.handleClickLink}/> }
  
      <TouchableOpacity
        style={{ ...bigButton }}
        onPress={() => { this.handleNavigation()}}
        >
        <Text style={{ ...buttonText }}>{ this.state.movingForward ? 'SIGN UP' : 'CONTINUE'} </Text>
      </TouchableOpacity>
      <Text style={{ textAlign: 'center', position: 'absolute', bottom: 16, alignSelf: 'center', fontSize: 13 }}> Already a member? Click to <Text style={{ color: defaultGreen }}> Log In</Text></Text>
    </View>
  )
}


// Components to be refactored
const SignUpForm = ({ handleChange, state, handleClick }) => (
  <View style={styles.formHolder}>
    <View style={styles.formContainer}>
      <Text style={styles.formLabel}> FULL NAME</Text>
      <TextInput style={styles.inputStyle}
        onChangeText={text => handleChange(text, 'name')}
        value={state.name}
        />
    </View>

    <View style={{ ...formContainer, marginTop: -10 }}>
      <Text style={styles.formLabel}> DATE OF BIRTH </Text>
      <DatePickerRender date={state.dob} handleChange={handleChange}/>
    </View>

    <View style={{ ...formContainer, marginTop: -10 }}>
      <Text style={styles.formLabel}> STATE OF REGISTRATION </Text>
      <PickerRender pickedItem={state.state} data={state.keys || []} handleChange={handleChange} name="state" style={{ ...inputStyle }} />
    </View>
    {/* double sided form -ting */}
    <GridForm handleChange={handleChange} state={state}/>
    <Text style={{ position: 'relative', top: -18, fontSize: 12, textAlign: 'center', height: 14, fontWeight: '500', color: '#B3B6B7' }}> Check your registration details <Text style={{ color: '#82BE30'}} onPress={() => { handleClick() }}> Here </Text></Text>
  </View>
);


const GridForm = ({ handleChange, state }) => (
  <View style={{ ...formContainer, width, flexDirection: 'row', justifyContent: 'space-around' }}>
    <View style={{ ...formContainer, width: width * 0.3, paddingLeft: 15, paddingRight: 15 }}>
      <Text style={{ ...formLabel, width: width * 0.4 }}>LGA OF REGISTRATION</Text>
      <PickerRender name="lga" pickedItem={state.lga} state={state} handleChange={handleChange} data={state.selectedLga} style={{ ...inputStyle, width: width * 0.3 }} />
    </View>

    <View style={{ ...formContainer, width: width * 0.3 }}>
      <Text style={styles.formLabel}>WARD</Text>
      <TextInput
        style={{ ...inputStyle, width: width * 0.3, borderBottomColor: '#B3B6B7', borderBottomWidth: 0.7, position: 'relative', bottom: -10 }}
        onChangeText={(text) => { handleChange(text, 'ward')}}
        value={state.ward}
      />
    </View>
  </View>
);


const DatePickerRender = ({ handleChange, date }) => (
  <DatePicker
    style={{ ...inputStyle, marginTop: 5 }}
    confirmBtnText='Confirm'
    cancelBtnText='Cancel'
    date={date}
    customStyles={{
      dateInput: { width: 700, borderColor: 'white' },
      dateIcon: { display: 'none' }
    }}
     onDateChange={(date) => handleChange(date, 'dob')}
  />
);

const PickerItemRender = data => data.map(d => <Picker.Item label={d.label} value={d.value} />);


const PickerRender = ({ style, data, handleChange, name, pickedItem }) => (
  <Picker
    style={{ ...style, height: 51, marginTop: -5 }}
    itemStyle={{ flex: 1, fontSize: 14, width: width * 0.27, color: '#909497' }}
    onValueChange={(value) => handleChange(value, name)}
    selectedValue={pickedItem}
    >
    { PickerItemRender(data) }
  </Picker>
);


// ======= SECOND SCREEN FOR NEXT ==============
const SignUpFormNext = ({ handleChange, state }) => (
  <View style={{ ...formHolder, height: height * 0.6, marginTop: 52, marginBottom: -15 }}>
    <View style={styles.formContainer}>
      <Text style={styles.formLabel}> EMAIL ADDRESS</Text>
      <TextInput style={styles.inputStyle}
        onChangeText={text => handleChange(text, 'email')}
        value={state.email}
         />
    </View>

    <View style={styles.formContainer}>
      <Text style={styles.formLabel}> PHONE NUMBER </Text>
      <TextInput style={styles.inputStyle}
          keyboardType="numeric"
          onChangeText={text => handleChange(text, 'phone')}
          value={state.phone}
         />
    </View>

    <View style={styles.formContainer}>
      <Text style={styles.formLabel}> PASSWORD </Text>
      <TextInput style={styles.inputStyle}
        onChangeText={text => handleChange(text, 'password')}
        secureTextEntry={true}
        value={state.password}
        />
    </View>

    <View style={styles.formContainer}>
      <Text style={styles.formLabel}> RETYPE PASSWORD </Text>
      <TextInput style={styles.inputStyle} secureTextEntry={true}/>
    </View>
  </View>
)

/* *******  Navigator Styling ********* */
SignUpComponent.navigatorStyle = {
  title: 'Registration',
  navBarBackgroundColor: defaultGreen,
  navBarTextColor: 'white',
  navBarNoBorder: true,
  statusBarTextColorScheme: 'light'
};

export default connect()(SignUpComponent);
