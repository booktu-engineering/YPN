import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { height, width, defaultGreen } from '../../mixins';
import { fetchUserThunk } from '../../actions/thunks/user';
import Composer from '../iterator';

const uri = 'https://res.cloudinary.com/dy8dbnmec/image/upload/v1535072474/logo.png';

const SingleUser = ({ data, obj }) => (
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
    onPress={() => { obj.dispatch(fetchUserThunk(data.id)(obj.navigator)); }}
  >
    <View style={{
 height: height * 0.05, width: width * 0.5, flexDirection: 'row', flexWrap: 'nowrap', alignItems: 'center'
}}
    >
      <Image
        style={{
 height: 60, width: 60, borderRadius: 30, marginRight: 8, resizeMode: (data.avatar ? "cover" : "center")
}}
        source={{ uri: (data.avatar || uri) }}
      />
      <View style={{ height: height * 0.06 }}>
        <Text style={{
 fontSize: 14, fontWeight: '600', color: '#1F2020', marginBottom: 5
}}
        > { `${data.firstname || ''} ${data.lastname || ''}` }
        </Text>
        <Text style={{ fontSize: 12, fontWeight: '500', color: defaultGreen }}> {`${data.username}`}</Text>
      </View>
    </View>
    <View style={{ height: height * 0.05, width: width * 0.4 }}>
      <Text style={{
 fontSize: 11.5, fontWeight: '500', color: '#D0D3D4', alignSelf: 'flex-end'
}}
      > { `${data.lga || ''}` }
      </Text>
    </View>
  </TouchableOpacity>
);

export const multipleUsers = Composer(SingleUser);
export default SingleUser;
