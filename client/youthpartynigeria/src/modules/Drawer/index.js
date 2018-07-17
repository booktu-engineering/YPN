import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { LogOut } from '../../helpers/init';
import { height, width } from '../../mixins/';

const uri = 'https://ht-cdn.couchsurfing.com/assets/profile-picture-placeholder.png';


const Drawer = ({ currentUser, navigator, current }) => (
  <View style={{ height }}>
    {/* Image side and what not */}
    <View style={{
 height: height * 0.25,
       backgroundColor: '#131313',
      flexDirection: 'row',
flexWrap: 'nowrap',
      justifyContent: 'space-evenly',
alignItems: 'center'
}}
    >
      <Image source={{ uri: (current.avatar ? current.avatar : uri) }} style={{ height: 74, width: 74, borderRadius: 37 }} />
      <View style={{ width: width * 0.4, position: 'relative', top: -4 }}>
        <Text style={{
 fontSize: 16, color: 'white', fontWeight: '700', marginBottom: 10
}}
        > { `${current.firstname} ${current.lastname}`}
        </Text>
        <Text style={{ fontSize: 12, color: 'white' }}> { `Ward: ${current.ward} | ${current.lga}`} </Text>
      </View>
    </View>
    {/* second part containing the icons */}
    <View style={{
 height: height * 0.75, backgroundColor: '#F2F3F4', paddingTop: 20, alignItems: 'flex-start', paddingLeft: 50
}}
    >
      <TouchableOpacity onPress={() => { navigator.showModal({ screen: 'Membership.Component', title: 'Become a party member' })}} style={{ flexDirection: 'row', flexWrap: 'nowrap', marginBottom: height * 0.03 }}>
        <Text style={{ fontSize: 15, fontWeight: '600' }}> Membership </Text>
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', flexWrap: 'nowrap', marginBottom: height * 0.03 }}>
        <Text style={{ fontSize: 15, fontWeight: '600' }}> Groups </Text>
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'nowrap', marginBottom: height * 0.03 }}>
        <Text style={{ fontSize: 15, fontWeight: '600' }}> Note Pad </Text>
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'nowrap', marginBottom: height * 0.03 }}>
        <Text style={{ fontSize: 15, fontWeight: '600' }}> About us </Text>
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'nowrap', marginBottom: height * 0.03 }}>
        <Text style={{ fontSize: 15, fontWeight: '600' }}> Constitution </Text>
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'nowrap', marginBottom: height * 0.03 }}>
        <Text style={{ fontSize: 15, fontWeight: '600' }}> Contact us </Text>
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'nowrap', marginBottom: height * 0.03 }}>
        <Text style={{ fontSize: 15, fontWeight: '600' }}> Settings </Text>
      </View>
      <TouchableOpacity onPress={() => LogOut()} style={{ flexDirection: 'row', flexWrap: 'nowrap', marginBottom: height * 0.03 }}>
        <Text style={{ fontSize: 15, fontWeight: '600' }}> Logout </Text>
      </TouchableOpacity>
    </View>
  </View>
);

Drawer.navigatorStyle = {
  statusBarHidden: true
};

const mapStateToProps = state => ({
  current: state.users.current
});

export default connect(mapStateToProps)(Drawer);
