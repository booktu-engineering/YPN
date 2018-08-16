import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { height, width, defaultGreen } from '../../mixins';

const AboutUs = ({ navigator }) => {
  navigator.setButtons({
    leftButtons: [
      {
        id: 'Back.nav',
        component: 'Back.Button',
        passProps: {
          navigator,
          modal: true
        }
      }
    ]
  })
  return (
        <View style={{ flex: 1}}> 
            <View style={{ height: height * 0.4, width, justifyContent: 'center', alignItems: 'center' }}> 
            <Text style={{ fontSize: 14, fontWeight: '500', color: '#191919' }}> 
            The Youth Party is made up of individuals and groups that seek to serve and unite Nigerians.
            Our goal is to develop and improve the standard of living of all Nigerians.
            </Text>
            </View>
            <View style={{ height: height * 0.3, width, paddingLeft: 30 }}>
            <TouchableOpacity style={{height: 30, width: 150 }} onPress={() => navigator.showModal({
              screen: 'Pdf.View',
              title: 'Aims and Objectives',
              passProps: {
                source: 5
              }
            }) }>
                <Text style={{color: '#82BE30', fontSize: 13 }}>> Aims and Objectives</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{height: 30, width: 150 }} 
            onPress={() => navigator.showModal({
              screen: 'Pdf.View',
              title: 'Beliefs',
              passProps: {
                source: 1
              }
            }) }>
                <Text style={{color: '#82BE30', fontSize: 13 }}>> Beliefs </Text>
            </TouchableOpacity>

            <TouchableOpacity style={{height: 30, width: 150 }} 
            onPress={() => navigator.showModal({
              screen: 'Pdf.View',
              title: 'Leadership',
              passProps: {
                source: 3
              }
            }) }>
                <Text style={{color: '#82BE30', fontSize: 13 }}>> Leadership </Text>
            </TouchableOpacity>

            <TouchableOpacity style={{height: 30, width: 150 }} 
            onPress={() => navigator.showModal({
              screen: 'Pdf.View',
              title: 'Manifesto',
              passProps: {
                source: 4
              }
            }) }>
                <Text style={{color: '#82BE30', fontSize: 13 }}>> Manifesto </Text>
            </TouchableOpacity>
            </View>
            
        </View>
  )
}

AboutUs.navigatorStyle = {
    navBarBackgroundColor: defaultGreen,
    statusBarTextColorScheme: 'light',
    preferredContentSize: { height: 2000 },
  };

  export default AboutUs