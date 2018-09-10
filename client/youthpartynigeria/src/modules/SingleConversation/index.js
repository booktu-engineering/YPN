import React from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity, View, Text } from 'react-native';
import { height, width, defaultGreen } from '../../mixins';
import { JoinConversation } from '../../actions/thunks/conversations';
import styles from '../SinglePost/styles';
import Composer from '../iterator';

const SingleConversationType1 = ({ obj, data }) => {
  return  (
    <TouchableOpacity  onPress={() => { obj.dispatch(JoinConversation(data)(obj.navigator))}} style={{ maxHeight: height * 0.41, width, paddingTop: 20, position: 'relative', borderBottomWidth: 0.5, borderBottomColor: '#E5E7E9' }}>
      <View style={{ paddingLeft: 15, maxHeight: height * 0.35, width, marginBottom: 20 }}>
        <Text style={{ fontSize: 15, fontWeight: '600', color: '#3E3F3F', marginBottom: 15 }}>{ data.topic || data.details.topic }</Text>
        <Text style={{ fontSize: 11.5, color: '#B3B6B7', fontWeight: '500', width: width * 0.9 }}> { data && data.focus ? `focus: ${data.focus.user.name}`: "This conversation might be for specific groups of people. Please check out for conversations you're allowed into"}</Text>
     </View>
    </TouchableOpacity>
  )
}

const ButtonStack = ({ data }) => {
  this.state = {
    like: '#D0D3D4',
    comment: '#D0D3D4',
    share: '#D0D3D4',
  }
  return (
    <View style={{
      flexDirection: 'row',
      flexWrap: 'nowrap',
      justifyContent: 'space-evenly',
      borderBottomWidth: 1,
      borderBottomColor: '#D0D3D450',
      paddingBottom: 10,
      paddingRight: 35,
    }}>
      { /* Likes for content */}
      <TouchableOpacity style={styles.button}>
        <View style={{ height: 6, width: 6, borderRadius: 3, marginRight: 2, position: 'relative', bottom: -6,  backgroundColor: defaultGreen }}></View>
        <Text style={{ color: this.state.like, fontSize: 12, position: 'relative', bottom: -2}}>Ongoing</Text>
    </TouchableOpacity>
      { /* comment for content */}
      <TouchableOpacity style={styles.buttonLower}>
        <MaterialIcon name="comment-text-outline" color={this.state.comment} size={17} />
        <Text style={{ color: this.state.comment, fontSize: 12}}>150 Messages</Text>
    </TouchableOpacity>
    { /* shares for the product */}
    <TouchableOpacity style={styles.buttonLowerR}>
      <Ionicon name="ios-share-alt-outline" color={this.state.share} size={17} />
      <Text style={{ color: this.state.share, fontSize: 12}}> {data.members.length} Participants</Text>
  </TouchableOpacity>
    </View>
  )
}

export const ConversationObjects = Composer(SingleConversationType1);
