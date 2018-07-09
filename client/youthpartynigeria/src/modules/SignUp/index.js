import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, TextInput, Picker, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { defaultGreen, inputStyle, formContainer, width, height, bigButton, buttonText, formHolder } from '../../mixins/';
import styles from './styles';
import userActions from '../../actions/thunks/user';
import { SingleUpload } from '../../helpers/uploader';

const { SignUpThunk } = userActions;


/* eslint jsx-quotes: 0, max-len: 0, object-curly-newline: 0 */

class SignUpComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movingForward: false,
      avatar: 'https://images.unsplash.com/photo-1498960660837-21234c68fbaf?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=14d46381da3fad72d0cada6a075f6314&auto=format&fit=crop&w=1500&q=80'
    };
  }

  handleChange = (value, name) => this.setState({ [name]: value })

  handleSubmit = () => {
  //generating the username
  const username = `${this.state.name.split(' ')[0].toLowerCase()}.${this.state.name.split(' ')[1].toLowerCase()}`
  this.props.dispatch(SignUpThunk({ user: { ...this.state, firstname: this.state.name.split(' ')[0], lastname: this.state.name.split(' ')[1], username }})(this.props.navigator))
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
      { this.state.movingForward ? <SignUpFormNext handleChange={this.handleChange} /> : <SignUpForm state={this.state} handleChange={this.handleChange} /> }
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
const SignUpForm = ({ handleChange, state }) => (
  <View style={styles.formHolder}>
    <View style={styles.formContainer}>
      <Text style={styles.formLabel}> FULL NAME</Text>
      <TextInput style={styles.inputStyle}
        onChangeText={text => handleChange(text, 'name')}
        />
    </View>

    <View style={{ ...formContainer, marginTop: -10 }}>
      <Text style={styles.formLabel}> DATE OF BIRTH </Text>
      <DatePickerRender date={state.dob} handleChange={handleChange}/>
    </View>

    <View style={{ ...formContainer, marginTop: -10 }}>
      <Text style={styles.formLabel}> STATE</Text>
      <PickerRender pickedItem={state.state} data={[{ label: 'Edo', value: 'Edo state' }, { label: 'Delta', value: 'Akwaba' }, { label: 'Uyo', value: 'Uyo' }]} handleChange={handleChange} name="state" style={{ ...inputStyle }} />
    </View>
    {/* double sided form -ting */}
    <GridForm handleChange={handleChange} state={state}/>
  </View>
);


const GridForm = ({ handleChange, state }) => (
  <View style={{ ...formContainer, width, flexDirection: 'row', justifyContent: 'space-around' }}>
    <View style={{ ...formContainer, width: width * 0.3, paddingLeft: 15, paddingRight: 15 }}>
      <Text style={styles.formLabel}> LGA</Text>
      <PickerRender name="lga" pickedItem={state.lga} state={state} handleChange={handleChange} data={[{ label: 'Edo', value: 'Edo state' }, { label: 'Uyo', value: 'Uyo' }]} style={{ ...inputStyle, width: width * 0.3 }} />
    </View>

    <View style={{ ...formContainer, width: width * 0.3 }}>
      <Text style={styles.formLabel}> WARD </Text>
      <PickerRender name="ward" pickedItem={state.ward} handleChange={handleChange} data={[{ label: 'Edo', value: 'Edo state' }, { label: 'Uyo', value: 'Uyo' }]} style={{ ...inputStyle, width: width * 0.3 }} />
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
    itemStyle={{ flex: 1, fontSize: 14, width: width * 0.1 }}
    onValueChange={(value) => handleChange(value, name)}
    selectedValue={pickedItem}
    >
    { PickerItemRender(data) }
  </Picker>
);


// ======= SECOND SCREEN FOR NEXT ==============
const SignUpFormNext = ({ handleChange }) => (
  <View style={{ ...formHolder, height: height * 0.6, marginTop: 52, marginBottom: -15 }}>
    <View style={styles.formContainer}>
      <Text style={styles.formLabel}> EMAIL ADDRESS</Text>
      <TextInput style={styles.inputStyle}
        onChangeText={text => handleChange(text, 'email')}
         />
    </View>

    <View style={styles.formContainer}>
      <Text style={styles.formLabel}> PHONE NUMBER </Text>
      <TextInput style={styles.inputStyle}
          keyboardType="numeric"
          onChangeText={text => handleChange(text, 'phone')}
         />
    </View>

    <View style={styles.formContainer}>
      <Text style={styles.formLabel}> PASSWORD </Text>
      <TextInput style={styles.inputStyle}
        onChangeText={text => handleChange(text, 'password')}
        secureTextEntry={true}
        />
    </View>

    <View style={styles.formContainer}>
      <Text style={styles.formLabel}> RETYPE PASSWORD </Text>
      <TextInput style={styles.inputStyle} secureTextEntry={true} />
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
