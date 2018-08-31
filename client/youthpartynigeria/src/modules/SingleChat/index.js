import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { height, width, defaultGreen, avatar, LightGrey } from '../../mixins';
import Composer from '../iterator';

const uri = 'https://ht-cdn.couchsurfing.com/assets/profile-picture-placeholder.png';

const generateNameFromMembers = (members) => {
  let string = members.reduce((a, b) => `${a} ${b.firstname} ${b.lastname}, `, '');
  string = string.trim().slice(0, (string.length - 2));
  if (string.length > 18) {
    string = string.slice(0, string.length - 8);
    string = `${string}...`;
  }
  return string;
};

const generateUri = (members) => {
  const position = Math.floor(Math.random() * members.length);
  const avatar = members[position].avatar ? members[position].avatar : uri;
  return avatar;
};

const SingleChat = ({ data, obj }) => {
  const title = data.title ? data.title : generateNameFromMembers(data.members.filter(item => item.id !== obj.user.id));
  return (
    <TouchableOpacity
      style={{
     height: height / 7, flexDirection: 'row', flexWrap: 'nowrap', paddingLeft: 15, borderBottomWidth: 1, borderBottomColor: '#D0D3D430', paddingTop: 10
    }}
      onPress={() => {
      obj.navigator.push({
        screen: 'Convo.Log',
        passProps: {
          data
        }
      });
    }}
    >
      <Image source={{ uri: generateUri(data.members.filter(item => item.id !== obj.user.id)) }} style={{ ...avatar, marginRight: 10 }} />
      <View style={{ width: width * 0.8, position: 'relative' }}>
        <Text style={{ fontSize: 13.5, fontWeight: '600' }}> { title } </Text>
        <Text style={{
     alignSelf: 'flex-end', fontSize: 11, fontWeight: '600', color: LightGrey, position: 'absolute', top: 0, right: 15
    }}
        > 20 Mins
        </Text>
        <Text style={{
     fontSize: 12.5, fontWeight: '500', width: width * 0.76, color: '#979A9A', marginTop: 5
    }}
        > Every person has a right to life, and no one shall be deprived intentionally of his life, save in...
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export const multipleChat = Composer(SingleChat);
export default SingleChat;
