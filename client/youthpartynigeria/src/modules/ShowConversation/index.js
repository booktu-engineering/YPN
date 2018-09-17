import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Screen from '../../mixins/screen';
import { height, width, defaultGreen, bigButton, buttonText } from '../../mixins';
import { withNavigation, BackIcon, NotificationIcon } from '../IconRegistry';
import { navigatorObject } from '../../navigation';
import { fetchUserThunk } from '../../actions/thunks/user';


const uri = 'https://res.cloudinary.com/dy8dbnmec/image/upload/v1535072474/logo.png';

const defaultUri = 'https://res.cloudinary.com/dy8dbnmec/image/upload/v1535072474/logo.png'
class ShowConversation extends Screen {
  constructor(props) {
    super(props, 'A.Test.Screen');
  }
   static navigatorStyle = {
     navBarHidden: true
   }

   componentWillUnmount = () => null;

  render = () => (
    <View style={{ minHeight: height, width }}>
      <CustomHeader navigator={this.props.navigator} data={{ origin: { name: 'Women Empowerment' } }} />
      <View style={{
 minHeight: height * 0.65, marginBottom: 25, width, justifyContent: 'center'
}}
      >
        <ConversationSingle />
      </View>
      <TouchableOpacity style={{ ...bigButton }} onPress={() => { this.props.navigator.push({ screen: 'Convo.Log', passProps: { data: { origin: 'Women Empowerment' } } }); }}>
        <Text style={{ ...buttonText }}> JOIN THE CONVERSATION </Text>
      </TouchableOpacity>
    </View>
  )
}

export const CustomHeader = ({ navigator, data, user, dispatch }) => (
  <View style={{
 height: height * 0.15, width, backgroundColor: defaultGreen, flexDirection: 'row', flexWrap: 'nowrap', paddingRight: 5, justifyContent: 'space-between', alignItems: 'center'
}}>
    { /* icon 1 */}
    <View style={{ 
      maxHeight: 40, maxWidth: 50, position: 'relative', right: -15  }}>
      { withNavigation(navigator, BackIcon)}
    </View>
    { /* The text Part */}
    <TouchableOpacity style={{
 width: width * 0.8, maxHeight: height * 0.2, flexDirection: 'row', flexWrap: 'nowrap'
}}
onPress={() => { navigateToUser(data.members, user, dispatch, navigator) }}
    >
      <Image style={{ height: 52, width: 52, borderRadius: 26, backgroundColor: 'white' }} source={{ uri: data.topic ? defaultUri : generateUri(data.members.filter(item => item.id !== user.id)) }} />
      <View style={{
 maxWidth: width * 0.8, maxHeight: height * 0.2, paddingRight: 20, justifyContent: 'center'
}}
      >
        <Text style={{
 fontSize: 18, fontWeight: '600', color: 'white', marginBottom: 5
}}
        > { data.topic ? sliceString(data.topic) : generateNames(data.members.filter(item => item.id !== user.id)) }
        </Text>
        {
          data.focus && (
            <Text style={{ fontSize: 14, color: 'white' }}> {`focus: ${data.focus.user.firstname} ${data.focus.user.lastname}`}</Text>
          )
        }
      </View>
    </TouchableOpacity>
    { /* Notification Icon */}
  </View>
);
const sliceString = (string) => {
  if (string.length > 15) {
    string = string.slice(0, string.length - 8);
    string = `${string}...`;
  }
  return string;
}
const generateNames = (members) => {
  let string = members.reduce((a, b) => `${a} ${b.firstname} ${members.length === 1 && b.lastname ? b.lastname : ''},`, '');
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


const ConversationSingle = () => (
  <View style={{ flex: 1 }}>
    { /* The first part */}
    <View style={{
 height: height * 0.3, width, borderColor: '#D0D3D450', borderBottomWidth: 1.3, paddingTop: 25, paddingLeft: 20, paddingRight: 20, justifyContent: 'space-around', paddingBottom: 15
}}
    >
      <Text style={{
 fontSize: 12.5, fontWeight: '500', color: '#797D7F', maxWixdth: width * 0.75, marginBottom: 10
}}
      >Women empowerment has become the buzzword today with women working alongside men in all spheres. They profess an independent outlook, whether they are living inside their home or working outside
      </Text>
      <View style={{
 maxHeight: height * 0.1, width, flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'space-between'
}}
      >
        <View style={{ maxHeight: height * 0.1, maxWidth: width * 0.5 }}>
          <Text style={{
 fontSize: 11.5, fontWeight: '600', color: '#B3B6B7', marginBottom: 8,
}}
          >Tuesday 22nd May, 2018
          </Text>
          <Text style={{ fontSize: 11.5, fontWeight: '600', color: '#B3B6B7' }}>Time: 6:00PM</Text>
        </View>
        { /* Ongoing */}
        <View style={{
 maxHeight: height * 0.05, maxWidth: width * 0.5, flexDirection: 'row', flexWrap: 'nowrap', position: 'relative', left: -35
}}
        >
          <View style={{
 height: 6, width: 6, borderRadius: 3, marginRight: 2, position: 'relative', bottom: -6, backgroundColor: defaultGreen
}}
          />
          <Text style={{
 color: '#B3B6B7', fontSize: 12, position: 'relative', bottom: -2
}}
          > Ongoing
          </Text>
        </View>
      </View>
    </View>
    { /* Second pArt showing the moderators */}
    <View style={{
 minHeight: height * 0.3, maxWidth: width * 0.5, alignSelf: 'center', paddingTop: 20,
}}
    >
      <View style={{ alignSelf: 'center', maxHeight: height * 0.15, marginBottom: 15 }}>
        <Text style={{
 fontSize: 13, fontWeight: '600', color: '#626567', marginBottom: 10, textAlign: 'center'
}}
        > Moderators
        </Text>
        <Text style={{
 fontSize: 13, fontWeight: '500', color: '#B3B6B7', marginBottom: 5
}}
        > Phillip Otemuyiwa
        </Text>
        <Text style={{
 fontSize: 13, fontWeight: '500', color: '#B3B6B7', marginBottom: 5, textAlign: 'center'
}}
        > Mary Timothy
        </Text>
      </View>
      { /* Debaters */}
      <View style={{ alignSelf: 'center', maxHeight: height * 0.15, marginBottom: 25 }}>
        <Text style={{
 fontSize: 13, fontWeight: '600', color: '#626567', marginBottom: 10, textAlign: 'center'
}}
        > Debaters
        </Text>
        <Text style={{
 fontSize: 13, fontWeight: '500', color: '#B3B6B7', marginBottom: 5
}}
        > Aminat Yahaya Bello
        </Text>
        <Text style={{
 fontSize: 13, fontWeight: '500', color: '#B3B6B7', marginBottom: 5
}}
        > Dr. Mrs Sharon Taiwo
        </Text>
      </View>
      <Text style={{ fontSize: 12.4, fontWeight: '500', color: '#D0D3D4' }}> Join the conversation to see debate progress and messages </Text>
    </View>
  </View>
);

const navigateToUser = (members, user, dispatch, navigator) => {
  if (members.length > 2) return navigator.push({ screen: 'Show.Users', title: 'Members of this conversation', navigatorStyle: { tabBarHidden: true }, passProps: { data: members.filter(item => item.id !== user.id ) }});
  members = members.filter(item => item && item.id && item.id !== user.id);
  dispatch(fetchUserThunk(members[0].id)(navigator));
};
export default ShowConversation;
