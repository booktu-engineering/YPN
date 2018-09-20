import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { height, width, defaultGreen, avatar, LightGrey } from '../../mixins';
import Composer from '../iterator';

const uri = 'https://res.cloudinary.com/dy8dbnmec/image/upload/v1535072474/logo.png';
const defaultUri = 'https://res.cloudinary.com/dy8dbnmec/image/upload/v1535072474/logo.png';

const generateNameFromMembers = (members) => {
  let string = members.reduce((a, b) => `${a} ${b.firstname} ${members.length === 1 && b.lastname ? b.lastname : ''},`, '');
  string = string.trim().slice(0, (string.length - 2));
  if (string.length > 18) {
    string = string.slice(0, string.length - 8);
    string = `${string}...`;
  }
  return string;
};

const generateUri = (members) => {
  const avatar = members[0].avatar ? members[0].avatar : uri;
  return avatar;
};

const SingleChat = ({ data, obj }) => {
  const title = data.topic ? data.topic : generateNameFromMembers(data.members.filter(item => item.id !== obj.user.id));
  return (
    <TouchableOpacity
      style={{
        height: height / 7, 
        flexDirection: 'row', 
        flexWrap: 'nowrap', 
        paddingLeft: 15, 
        borderBottomWidth: 1, 
        borderBottomColor: '#D0D3D430', 
        paddingTop: 10,
        backgroundColor: !obj.unreads[data._id] || obj.unreads[data._id] < data.visited ? '#F9E79F' : 'white'
      }}
      onPress={() => {
        obj.updateCache(data)
        obj.navigator.push({
          screen: 'Convo.Log',
          passProps: {
            data
          }
        });
      }}
    >
     { data.type === 1  && <Image source={{ uri: data.topic ? defaultUri : generateUri(data.members.filter(item => item.id !== obj.user.id)) }} style={{ ...avatar, marginRight: 10, resizeMode: (data.members.filter(item => item.id !== obj.user.id)[0].avatar ? 'cover' : 'center') }} /> }
     { data.type > 1 && 
      <View style={{ ...avatar, backgroundColor: '#E5E7E9', justifyContent: 'center', alignItems: 'center', marginRight: 7 }}> 
                  <Ionicon name="ios-microphone" size={26} color={defaultGreen} style={{ position: 'relative' }}/>
      </View> 

    }
      <View style={{ width: width * 0.8, position: 'relative' }}>
        <Text style={{ fontSize: 13.5, fontWeight: '600' }}> { title } </Text>
        <Text style={{
          alignSelf: 'flex-end', fontSize: 11, fontWeight: '600', color: LightGrey, position: 'absolute', top: 0, right: 15
        }}
        ></Text>
        <Text style={{
          fontSize: 12.5, fontWeight: '500', width: width * 0.76, color: '#979A9A', marginTop: 5
        }}
        >{ obj.registry && obj.registry[data._id][0] && obj.registry[data._id][0].content.slice(0, 50) || ''}</Text>
      </View>
    </TouchableOpacity>
  );
};

export const multipleChat = Composer(SingleChat);
export default SingleChat;
