import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import moment from 'moment';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { height, width, defaultGreen, avatar, LightGrey } from '../../mixins';
import Composer from '../iterator';

const uri = 'https://res.cloudinary.com/dy8dbnmec/image/upload/v1535072474/logo.png';
const defaultUri = 'https://res.cloudinary.com/dy8dbnmec/image/upload/v1535072474/logo.png';

const generateNameFromMembers = (members) => {
  let string = members.reduce((a, b) => `${a} ${b.firstname} ${members.length === 1 && b.lastname ? b.lastname : ''},`, '');
  string = string.trim().slice(0, (string.length - 2))
  return formatString(string, members);
};

const formatString = (string, members) => {
  if(string.length < 18) return string;
  string = string.slice(0, string.length - parseInt(0.6 * string.length)).split('')
  string[string.length -1] = '';
  string = string.join('')
  string = `${string} ${ members ? `and ${members.length} others` : '...'}`;
  return string;
}

const generateUri = (members) => {
  const avatar = members[0].avatar ? members[0].avatar : uri;
  return avatar;
};


const generateColor = (obj, data) => {
  if(!Object.keys(obj.unreads).length) return 'white';
  // so this is the main guy
  // if( (!obj.unreads[data._id] || obj.unreads[data._id] < data.visited) && !(obj.registry && obj.registry[data._id][0])) return '#F9E79F';
  // this checks that last message is not from the current user
  if((!obj.unreads[data._id] || obj.unreads[data._id] < data.visited) && (obj.registry && obj.registry[data._id][0] && obj.registry[data._id][0].origin.id !== obj.user.id)) return '#F9E79F';
  return 'white';
}

const SingleChat = ({ data, obj }) => {
  const title = data.topic ? formatString(data.topic) : generateNameFromMembers(data.members.filter(item => item.id !== obj.user.id));
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
        backgroundColor: generateColor(obj, data)
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
      <View style={{ width: width * 0.8, position: 'relative', paddingLeft: 5 }}>
        <Text style={{ fontSize: 13.5, fontWeight: '600' }}>{ title }</Text>
        <Text style={{
          alignSelf: 'flex-end', fontSize: 11, fontWeight: '600', color: LightGrey, position: 'absolute', top: 0, right: 15
        }}
        >{moment(new Date(data.visited)).fromNow(true) || ''}</Text>
        <Text style={{
          fontSize: 12.5, fontWeight: '500', width: width * 0.76, color: '#979A9A', marginTop: 5
        }}
        >{ obj.registry && obj.registry[data._id][0] && `${obj.registry[data._id][0].origin.id === obj.user.id ? 'You:' : `${obj.registry[data._id][0].origin.firstname}:`} ${obj.registry[data._id][0].content.slice(0, 50)}` || ''}</Text>
      </View>
    </TouchableOpacity>
  );
};

class SingleChatContainer extends React.Component {
  shouldComponentUpdate = (nextProps) => {
    const { data } = this.props;
    if(!this.props.obj.registry[data._id]) return true;
    if(!this.props.obj.registry[data._id][0] && !nextProps.obj.registry[data._id][0]) return false;
    if(this.props.obj.registry[data._id][0].content === nextProps.obj.registry[data._id][0].content) return false;
    return true;
    }
  
  render = () => <SingleChat {...this.props} />
}

export const multipleChat = Composer(SingleChatContainer);
export default SingleChat;
