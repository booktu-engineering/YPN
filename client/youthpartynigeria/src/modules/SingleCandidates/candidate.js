import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { height, width, defaultGreen } from '../../mixins';
import Composer from '../iterator';

const uri = 'https://menhairstylist.com/wp-content/uploads/2017/07/dreads-in-man-bun-black-men-hairstyles.jpg';

const SingleCandidate = (props) => {
  const { obj } = props
  return (
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
      onPress={() => {
   obj.indicator ? obj.navigator.push({
   screen: 'DonationPT',
  title: 'Donations',
  passProps: {
   avatar: '', name: 'Femi Bukola', location: 'Kaduna, Kaduna State', role: 'Speaker', category: 'Candidate'
  }
  }) : obj.navigator.push({ screen: 'Show.Position', title: 'Femi Bukola', passProps: { candidate: true } });
  }}
    >
      <View style={{
   height: height * 0.05, width: width * 0.5, flexDirection: 'row', flexWrap: 'nowrap', alignItems: 'center'
  }}
      >
        <Image
          style={{
   height: 60, width: 60, borderRadius: 30, marginRight: 8,
  }}
          source={{ uri }}
        />
        <View style={{ height: height * 0.06 }}>
          <Text style={{
   fontSize: 14, fontWeight: '600', color: '#1F2020', marginBottom: 5
  }}
          > { props.data.meta.user.name }
          </Text>
          <Text style={{ fontSize: 12, fontWeight: '500', color: defaultGreen }}> {props.data.meta.user.position}</Text>
        </View>
      </View>
      <View style={{ height: height * 0.05, width: width * 0.4 }}>
        { !obj.indicator ?
          <TouchableOpacity style={{
   paddingTop: 4, height: 20, width: 60, alignSelf: 'flex-end', borderRadius: 3, backgroundColor: defaultGreen, alignItems: 'center', marginBottom: 8
  }}
          >
            <Text style={{ fontSize: 10, color: 'white', fontWeight: '500' }}> View </Text>
          </TouchableOpacity> : null
        }
        <Text style={{
   fontSize: 11.5, fontWeight: '500', color: '#D0D3D4', alignSelf: 'flex-end'
  }}
        > { props.data.meta.user.location }
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export const multipleCandidates = Composer(SingleCandidate);
export default SingleCandidate;
