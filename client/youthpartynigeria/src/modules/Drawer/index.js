import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, TouchableOpacity, Share } from 'react-native';
import { LogOut } from '../../helpers/init';
import { height, width } from '../../mixins';

const uri = 'https://res.cloudinary.com/dy8dbnmec/image/upload/v1535072474/logo.png';

const SharePost = () => {
  Share.share({
    title: 'Download Youth Party Application from the app store',
    message: 'Join the revolutionaries by downloading Youth Party App from the app store',
    url: 'https://youthpartyng.com/'
  })
}

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
      <Image source={{ uri: (current.avatar ? current.avatar : uri) }} style={{ height: 74, width: 74, borderRadius: 37, backgroundColor: 'white', resizeMode: (current.avatar ? 'cover' : 'center') }} />
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
      <TouchableOpacity onPress={() => { navigator.showModal({ screen: 'Voter.Page', title: 'Voter Eligibility' })}} style={{ flexDirection: 'row', flexWrap: 'nowrap', marginBottom: height * 0.03 }}>
        <Text style={{ fontSize: 15, fontWeight: '600' }}> Voter Eligibility </Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ flexDirection: 'row', flexWrap: 'nowrap', marginBottom: height * 0.03 }} 
        onPress={() => navigator.showModal({ screen: 'About', title: 'About Us'})}
      >
        <Text style={{ fontSize: 15, fontWeight: '600' }}> About us </Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ flexDirection: 'row', flexWrap: 'nowrap', marginBottom: height * 0.03 }} 
        onPress={() => navigator.showModal({ screen: 'Contact.Us', title: 'Contact Us'})}
      >
        <Text style={{ fontSize: 15, fontWeight: '600' }}> Contact us </Text>
      </TouchableOpacity>

      <TouchableOpacity style={{ flexDirection: 'row', flexWrap: 'nowrap', marginBottom: height * 0.03 }} 
        onPress={() => navigator.showModal({ screen: 'Settings', title: 'Settings'})}
      >
        <Text style={{ fontSize: 15, fontWeight: '600' }}> Settings </Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ flexDirection: 'row', flexWrap: 'nowrap', marginBottom: height * 0.03 }} 
        onPress={SharePost}
      >
        <Text style={{ fontSize: 15, fontWeight: '600' }}> Share </Text>
      </TouchableOpacity>
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
