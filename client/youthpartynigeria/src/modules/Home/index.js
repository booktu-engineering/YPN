import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { defaultGreen } from '../../mixins/';

const Home = () => (
  <View style={{ flex: 1}}>
    <Text> Hello there from the home component </Text>
  </View>
)

Home.navigatorStyle = {
  navBarBackgroundColor: defaultGreen,
  statusBarTextColorScheme: 'light'
}

export default Home;
