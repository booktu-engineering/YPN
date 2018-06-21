import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { height, width, defaultGreen } from '../../mixins'
import iterator from '../iterator/';

const uri = 'https://i.ytimg.com/vi/SgyzVKYI6IY/maxresdefault.jpg'

const SingleEvent = ({ obj }) => (
  <TouchableOpacity style={{ height: height * 0.16, flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'space-around', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#F8F9F9' }}
    onPress={() => { obj.navigator.push({ screen: 'Show.Event', title: 'Event' })} }
    >
    <Image style={{ height: 60, width: 60, borderRadius: 30, position: 'relative', right: -10}} source={{ uri }}/>
    <View style={{ width: width * 0.5, position: 'relative', bottom: -3 }}>
      <Text style={{ fontSize: 13.5, fontWeight: '500', color: '#2B2C2C', marginBottom: 8}}> Capacity Building Workshop </Text>
      <Text style={{ fontSize: 12, fontWeight: '500', color: '#BDC3C7', marginBottom: 8}}> Date: { '20th June, 2018'} </Text>
      <Text style={{ fontSize: 12, fontWeight: '500', color: '#BDC3C7'}}> Time: { '3:00PM'} </Text>
    </View>
    <View style={{ backgroundColor: defaultGreen, height: height * 0.028, width: width * 0.12, borderRadius: 2, position: 'relative', bottom: height * 0.023, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontWeight: '500', fontSize: 10.5, color: 'white'}}> View </Text>
    </View>
</TouchableOpacity>
)

export const MultipleEvents = iterator(SingleEvent)
export default SingleEvent
