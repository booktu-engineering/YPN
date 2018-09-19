import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import { height, width, defaultGreen } from '../../mixins/';
import SingleUser from './';
import SinglePost from '../SinglePost/index';
import SearchableHOC from '../../hocs/SearchableContent';
import configureStore from '../../store';

const { store } = configureStore();

class FollowUser extends Component {
  render = () => (
    <View style={{ minHeight: height, width, paddingTop: height * 0.05 }}>
      <View style={{
 height: height * 0.07, flexDirection: 'row', flexWrap: 'nowrap',
 paddingLeft: 10
}}
      >
        <Text
          style={{
 fontSize: 13, fontWeight: '600', maxWidth: 50, color: defaultGreen,
 marginRight: width * 0.3
}}
          onPress={() => { this.props.navigator.dismissModal({ animationType: 'slide-down' }); }}
        > Done
        </Text>
        <Text style={{
 fontSize: 14, fontWeight: '500', color: 'black',
 position: 'relative', textAlign: 'center'
}}
        > Search
        </Text>
      </View>
      <View style={{ height: height * 0.9, width }}>
        { SearchableHOC(SinglePost)(SingleUser)({ keys: ['Posts', 'Users'], directories: { Posts: this.props.posts, Users: this.props.data }, props: this.props})}
      </View>
    </View>
  )
}

const mapStateToProps = (state) => ({
   user: state.users.current,
   friendsIDs: state.users.friendsIDs,
   posts: state.posts.timeline
})

FollowUser.navigatorStyle = {
  navBarHidden: true
};

export default connect(mapStateToProps)(FollowUser);
