import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import { height, width, defaultGreen } from '../../mixins/';
import { multipleUsers } from './';
import configureStore from '../../store';

const { store } = configureStore();

class FollowUser extends Component {
  render = () => (
    <View style={{ minHeight: height, width, paddingTop: height * 0.05 }}>
      <View style={{
 height: height * 0.07, flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'space-around'
}}
      >
        <Text
          style={{
 fontSize: 13, fontWeight: '600', maxWidth: 50, color: defaultGreen
}}
          onPress={() => { this.props.navigator.dismissModal({ animationType: 'slide-down' }); }}
        > Done
        </Text>
        <Text style={{
 fontSize: 14, fontWeight: '500', width: width * 0.7, color: 'black',
 position: 'relative', textAlign: 'center', left: -14
}}
        > Follow users on Youth Party
        </Text>
      </View>
      <View style={{ minHeight: height * 0.7, width }}>
        { multipleUsers(this.props.data)({ navigator: this.props.navigator, dispatch: store.dispatch })}
      </View>
    </View>
  )
}

FollowUser.navigatorStyle = {
  navBarHidden: true
};

export default FollowUser;
