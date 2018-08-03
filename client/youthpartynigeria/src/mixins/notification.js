import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import connect from 'react-redux';
import { height, width } from './';

const Notification = ({ message }) => (
  <TouchableOpacity style={{
      height: height * 0.1,
      width,
      justifyContent: 'center',
      backgroundColor: '#0D0D0E',
      paddingLeft: 10
     }}>
    <Text style={{ color: '#D7DBDD', fontSize: 14, marginBottom: 5, fontWeight: '600' }}> Youth Party </Text>
    <Text style={{ color: 'white', fontSize: 12.5, fontWeight: '500' }}> { message }</Text>
</TouchableOpacity>
)

Notification.navigatorStyle = {
  statusBarHidden: true
}

export default Notification;
