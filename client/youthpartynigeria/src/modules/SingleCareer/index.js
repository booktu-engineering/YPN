import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { height, width, defaultGreen } from '../../mixins';
import Composer from '../iterator';

const uri = 'https://buzznigeria.com/wp-content/uploads/2013/09/Presidential-flag-Standard.png';
const SingleCareer = ({ obj, data }) => (
  <TouchableOpacity
    style={{
 height: height * 0.14,
width,
      flexDirection: 'row',
flexWrap: 'nowrap',
justifyContent: 'space-between',
      alignItems: 'center',
paddingLeft: 15,
paddingRight: 15,
paddingTop: 15,
borderColor: '#B3B6B730',
borderTopWidth: 0.3,
borderBottomWidth: 0.3
}}
    onPress={() => obj.navigator.push({ screen: 'Show.Career', title: 'Careers', passProps: { data } })}
  >
    <View style={{
 height: height * 0.13, width: width * 0.3, flexDirection: 'row', flexWrap: 'nowrap',
}}
    >
      <Image
        style={{
 height: 60, width: 60, borderRadius: 30, marginRight: 10
}}
        source={{ uri: data.meta.image || uri }}
      />
      <View style={{ height: height * 0.10, width: width * 0.34, justifyContent: 'center' }}>
        <Text style={{
 fontSize: 15, fontWeight: '600', color: '#1B1C1C', marginBottom: 5
}}
        > { data.origin || ''}
        </Text>
        <Text style={{
 fontSize: 13, fontWeight: '600', color: defaultGreen, marginBottom: 5
}}
        > {data.role || ''}
        </Text>
      </View>
    </View>
    <Text style={{
 height: 16, fontSize: 12, fontWeight: '400', color: '#B3B6B7', alignSelf: 'flex-start', position: 'relative', bottom: -10
}}
    > {data.meta.location || '' }
    </Text>
  </TouchableOpacity>
);


export const ComposedCareers = Composer(SingleCareer);
export default SingleCareer;
