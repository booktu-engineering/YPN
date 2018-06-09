import React, { Component } from 'react';
import { View, Text, Image, TextInput, Picker } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { defaultGreen, inputStyle, formContainer, width, height, bigButton, buttonText, formHolder } from '../../mixins/';
import styles from './styles';

const imageUri = 'https://images.unsplash.com/photo-1498960660837-21234c68fbaf?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=14d46381da3fad72d0cada6a075f6314&auto=format&fit=crop&w=1500&q=80'

/* eslint jsx-quotes: 0, max-len: 0, object-curly-newline: 0 */


class SignUpComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movingForward: false
    };
  }

  render = () => (
    <View style={{ flex: 1 }}>
      {/* This should contain the green bar and the image */}
      <View style={styles.greenBar}>
        <View style={styles.ImageHolder}>
          <Image style={styles.Image} source={{ uri: imageUri }} />
          <View style={styles.textHolder}>
            <Text style={styles.smallText}> Change Photo</Text>
          </View>
        </View>
      </View>
      { /* end of the green bar */}
      { this.state.movingForward ? <SignUpFormNext /> : <SignUpForm /> }
      <View style={{ ...bigButton }}>
        <Text style={{ ...buttonText }} onPress={() => { this.setState({ movingForward: !this.state.movingForward }); }}>{ this.state.movingForward ? 'SIGN UP' : 'CONTINUE'} </Text>
      </View>
      <Text style={{ textAlign: 'center', position: 'absolute', bottom: 16, alignSelf: 'center', fontSize: 13 }}> Already a member? Click to <Text style={{ color: defaultGreen }}> Log In</Text></Text>
    </View>
  )
}


// Components to be refactored
const SignUpForm = () => (
  <View style={styles.formHolder}>
    <View style={styles.formContainer}>
      <Text style={styles.formLabel}> FULL NAME</Text>
      <TextInput style={styles.inputStyle} />
    </View>

    <View style={{ ...formContainer, marginTop: -10 }}>
      <Text style={styles.formLabel}> DATE OF BIRTH </Text>
      <DatePickerRender />
    </View>

    <View style={{ ...formContainer, marginTop: -10 }}>
      <Text style={styles.formLabel}> STATE</Text>
      <PickerRender data={[{ label: 'Edo', value: 'Edo state' }, { label: 'Uyo', value: 'Uyo' }]} style={{ ...inputStyle }} />
    </View>
    {/* double sided form -ting */}
    <GridForm />
  </View>
);


const GridForm = () => (
  <View style={{ ...formContainer, width, flexDirection: 'row', justifyContent: 'space-around' }}>
    <View style={{ ...formContainer, width: width * 0.3, paddingLeft: 15, paddingRight: 15 }}>
      <Text style={styles.formLabel}> LGA</Text>
      <PickerRender data={[{ label: 'Edo', value: 'Edo state' }, { label: 'Uyo', value: 'Uyo' }]} style={{ ...inputStyle, width: width * 0.3 }} />
    </View>

    <View style={{ ...formContainer, width: width * 0.3 }}>
      <Text style={styles.formLabel}> WARD </Text>
      <PickerRender data={[{ label: 'Edo', value: 'Edo state' }, { label: 'Uyo', value: 'Uyo' }]} style={{ ...inputStyle, width: width * 0.3 }} />
    </View>
  </View>
);


const DatePickerRender = () => (
  <DatePicker
    style={{ ...inputStyle, marginTop: 5 }}
    confirmBtnText='Confirm'
    cancelBtnText='Cancel'
    customStyles={{
      dateInput: { width: 700, borderColor: 'white' },
      dateIcon: { display: 'none' }
    }}
  />
);

const PickerItemRender = data => data.map(d => <Picker.Item label={d.label} value={d.value} />);


const PickerRender = ({ style, data }) => (
  <Picker style={{ ...style, height: 51, marginTop: -5 }} itemStyle={{ flex: 1, fontSize: 14, width: width * 0.1 }}>
    { PickerItemRender(data) }
  </Picker>
);


// ======= SECOND SCREEN FOR NEXT ==============
const SignUpFormNext = () => (
  <View style={{ ...formHolder, height: height * 0.6, marginTop: 52, marginBottom: -15 }}>
    <View style={styles.formContainer}>
      <Text style={styles.formLabel}> EMAIL ADDRESS</Text>
      <TextInput style={styles.inputStyle} />
    </View>

    <View style={styles.formContainer}>
      <Text style={styles.formLabel}> PHONE NUMBER </Text>
      <TextInput style={styles.inputStyle} />
    </View>

    <View style={styles.formContainer}>
      <Text style={styles.formLabel}> PASSWORD </Text>
      <TextInput style={styles.inputStyle} />
    </View>

    <View style={styles.formContainer}>
      <Text style={styles.formLabel}> RETYPE PASSWORD </Text>
      <TextInput style={styles.inputStyle} />
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

export default SignUpComponent;
