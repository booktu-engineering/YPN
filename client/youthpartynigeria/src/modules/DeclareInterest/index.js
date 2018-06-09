import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { CheckBox } from 'react-native-elements'
import { defaultGreen, height, width, bigButton, buttonText } from '../../mixins/'
import { navigatorObject } from '../../navigation/'
import data from './mocks'

/* eslint object-curly-newline: 0, max-len: 0 */
const DeclareInterest = () => (
  <View style={{ flex: 1 }}>
    <View style={{ height: height * 0.15, backgroundColor: defaultGreen, marginBottom: 15 }}>
      <Text style={{ textAlign: 'center', color: 'white', fontSize: 20, marginBottom: 10, fontWeight: '600' }}> Interests </Text>
      <Text style={{ textAlign: 'center', fontSize: 14, fontWeight: '400', color: 'white', width: width * 0.7, alignSelf: 'center'}}> Scroll and select at least 3 categories you are interested in to customize your feed </Text>
    </View>

    {/* render the checkboxes */}
    <View style={{ height: height * 0.6, flexDirection: 'row', flexWrap: 'wrap', alignSelf: 'center', position: 'relative', right: -25 , marginBottom: 10 }}>
      { CheckBoxRender(data) }
    </View>
    {/* End of check box render/ begin big button  */}

    <View style={{ ...bigButton }}>
      <Text style={{ ...buttonText }} onPress={() => navigatorObject.startLoggedIn()}> FINISH </Text>
    </View>
  </View>
)

const CheckBoxRender = args => args.map(i => <View style={{ width: width * 0.5, marginBottom: 10 }}> <CheckBoxSingle title={i.title} /> </View>)

const CheckBoxSingle = ({ title }) => {
  this.state = { checked: false }
  return (
    <CheckBox
      title={title}
      checked={this.state.checked}
      checkedColor={defaultGreen}
      onPress={() => { Promise.resolve(!this.state.checked) }}
      containerStyle={{
        backgroundColor: 'white',
        borderColor: 'white'
      }}
      textStyle={{
        fontSize: 14,
        color: '#797D7F',
        fontWeight: '600'
      }}
    />
  );
};

DeclareInterest.navigatorStyle = {
  navBarBackgroundColor: defaultGreen
}

DeclareInterest.navigatorButtons = {
  leftButtons: [{
    title: 'Back',
    id: 'back.button',
    buttonColor: '#ffffff',
    buttonFontSize: 15
  }],
  rightButtons: [{
    title: 'Skip',
    id: 'skip.action',
    buttonColor: '#ffffff',
    buttonFontSize: 15
  }]
};


export default DeclareInterest;
