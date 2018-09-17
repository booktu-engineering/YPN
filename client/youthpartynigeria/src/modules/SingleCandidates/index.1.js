import React from 'react';
import{ View, Text, Image, TouchableOpacity } from 'react-native';
import { height, width, defaultGreen } from '../../mixins';
import moment from 'moment';
import Composer from '../iterator';
import SingleCandidate from './candidate';

const uri = 'https://res.cloudinary.com/dy8dbnmec/image/upload/v1535072474/logo.png'
export const SinglePosition = ({ data, obj }) => (
  <TouchableOpacity
    style={{
      height: height * 0.15,
      width,
      flexDirection: 'row',
      flexWrap: 'nowrap',
      justifyContent: 'space-between',
      paddingLeft: 20,
      paddingRight: 20,
      borderColor: '#D0D3D4',
      borderBottomWidth: 0.3,
      alignItems: 'center'
    }}
    onPress={() => { obj.navigator.push({ screen: 'Show.Position', title: `${data.name || 'Open Position'}`, passProps: { data } }) }}
    >
    <View style={{ height: height * 0.05, width: width * 0.5, flexDirection: 'row', flexWrap: 'nowrap', alignItems: 'center' }}>
      <Image style={{ height: 60, width: 60, borderRadius: 30, marginRight: 8, resizeMode: (data.meta.image ? 'cover' : 'center') }} source={{ uri: data.meta.image || uri }}/>
      <View style={{ height: height * 0.06}}>
        <Text style={{ fontSize: 14, fontWeight: '600', color: '#1F2020', marginBottom: 5 }}> {data.name || ''}</Text>
        <Text style={{ fontSize: 12, fontWeight: '500', color: defaultGreen }}> {data.meta.location || ''}</Text>
      </View>
    </View>
    <View style={{ height: height * 0.05, width: width * 0.4}}>
      <TouchableOpacity style={{ paddingTop: 4, height: 20, width: 60, alignSelf: 'flex-end', borderRadius: 3, backgroundColor: defaultGreen, alignItems: 'center', marginBottom: 8}}>
          <Text style={{ fontSize: 10, color: 'white', fontWeight: '500'}}> Apply </Text>
      </TouchableOpacity>
      <Text style={{ fontSize: 11.5, fontWeight: '500', color: '#D0D3D4', alignSelf: 'flex-end'}}> Closing { '24th'} June</Text>
    </View>
  </TouchableOpacity>
)



export const composedCandidates = Composer(SingleCandidate);
export const composedPositions =  Composer(SinglePosition);
