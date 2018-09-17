import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import Composer from '../iterator/';
import { height, width, defaultGreen } from '../../mixins/';

const SingleProject = props => (
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
    onPress={() => props.obj.navigator.push({ screen: 'DonationPT', title: 'Donations', passProps: { ...props.data, category: 'Project/Party' } })}
  >
    <View style={{
 height: height * 0.05, width: width * 0.5, flexDirection: 'row', flexWrap: 'nowrap', alignItems: 'center'
}}
    >
      <Image
        style={{
 height: 60, width: 60, borderRadius: 30, marginRight: 8,
 resizeMode: 'center'
}}
        source={{ uri: 'https://res.cloudinary.com/dy8dbnmec/image/upload/v1535072474/logo.png' }}
      />
      <View style={{ height: height * 0.06 }}>
        <Text style={{
 fontSize: 14, fontWeight: '600', color: '#7B7D7D', marginBottom: 5
}}
        > { props.data.title }
        </Text>
        <Text style={{ fontSize: 12, fontWeight: '500', color: defaultGreen }}> { props.data.meta.location } </Text>
      </View>
    </View>
  </TouchableOpacity>
);

export const data = [
  {
    avatar: 'https://qz.com/wp-content/uploads/2017/06/19575061_1355575787863484_8238479006744169542_o.jpg?quality=80&strip=all&w=1200',
    location: 'Warri, Delta State',
    name: 'Basic Education Project'
  },
  {
    avatar: 'https://media.newyorker.com/photos/59097ddeebe912338a378b6a/master/w_727,c_limit/Malek-For-Syrian-Americans-the-Travel-Ban-Feels-Alarmingly-Familiar.jpg',
    location: 'Kaduna, Kaduna State',
    name: 'Youth Party'
  }
];

export const composedProjects = Composer(SingleProject);
