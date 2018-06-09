import React from 'react'
import { View, Text, Image } from 'react-native'
import { height, width } from '../../mixins/'

const uri = 'https://menhairstylist.com/wp-content/uploads/2017/07/dreads-in-man-bun-black-men-hairstyles.jpg'
const Drawer = ({ currentUser, navigator }) => (
  <View style={{ height }}>
    {/* Image side and what not */}
    <View style={{ height: height * 0.25,
       backgroundColor: '#131313',
      flexDirection: 'row', flexWrap: 'nowrap',
      justifyContent: 'space-evenly', alignItems: 'center' }}>
      <Image source={{ uri }} style={{ height: 74, width: 74, borderRadius: 37 }} />
        <View style={{ width: width * 0.4, position: 'relative', top: -4 }}>
          <Text style={{ fontSize: 16, color: 'white', fontWeight: '700', marginBottom: 10}}> John Doe</Text>
          <Text style={{ fontSize: 12, color: 'white'}}> Ward 12 | Surulere LGA </Text>
        </View>
    </View>
    {/* second part containing the icons */}
    <View style={{ height: height * 0.75, backgroundColor: '#F2F3F4', paddingTop: 20, alignItems: 'flex-start', paddingLeft: 50 }}>
      <View style={{ flexDirection: 'row', flexWrap: 'nowrap', marginBottom: height * 0.03 }}>
        <Text style={{ fontSize: 15, fontWeight: '600' }}> Membership </Text>
      </View>
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
        <Text style={{ fontSize: 15, fontWeight: '600' }}> Contact us </Text>
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'nowrap', marginBottom: height * 0.03 }}>
        <Text style={{ fontSize: 15, fontWeight: '600' }}> Settings </Text>
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'nowrap', marginBottom: height * 0.03 }}>
        <Text style={{ fontSize: 15, fontWeight: '600' }}> Logout </Text>
      </View>
    </View>
  </View>
)

export default Drawer
