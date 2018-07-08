import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { defaultGreen, height, width } from '../../mixins/';
import { multiplePosts } from '../SinglePost/';
import { MultipleEvents } from '../SingleEvent';
import { BackIcon } from '../IconRegistry/';
import { startPersonalConversation } from '../../actions/thunks/conversations';

const uri = 'https://ht-cdn.couchsurfing.com/assets/profile-picture-placeholder.png';

class ShowUser extends Component {
  static navigatorStyle = {
    navBarBackgroundColor: defaultGreen,
    statusBarTextColorScheme: 'light',
    navBarNoBorder: true
  }

  static navigatorButtons = {
    leftButtons: [
      {
        id: 'ShowNav',
        component: 'SU.Back.Button'
      }
    ]
  }

  constructor(props) {
    super(props);
    this.state = { viewEvents: false };
    Navigation.registerComponent('SU.Back.Button', () => this.backIcon);
    this.props.navigator.toggleTabs({ to: 'hidden', animated: true });
  }

  backIcon = () => <BackIcon navigator={this.props.navigator} />

handleInitMessage = () => {
  this.props.dispatch(startPersonalConversation([this.props.target])(this.props.navigator));
}

  render = () => (
    <View style={{ flex: 1 }}>
      <View style={{ height: height * 0.07, backgroundColor: defaultGreen }} />
      <DisplayBio user={this.props.target} />
      <ButtonStack user={this.props.target} handleMessage={this.handleInitMessage} />
      { /* That barrieer thing */}
      <View style={{
 height: height * 0.05, width, flexDirection: 'row', flexWrap: 'nowrap'
}}
      >
        <TouchableOpacity
          style={{
 height: height * 0.05, width: width * 0.5, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8F9F9'
}}
          onPress={() => { this.setState({ viewEvents: false }); }}
        >
          <Text style={{ fontSize: 12.3, fontWeight: '600', color: this.state.viewEvents ? '#626567' : defaultGreen }}> Recent Posts </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
 height: height * 0.05, width: width * 0.5, justifyContent: 'center', alignItems: 'center', backgroundColor: '#E5E8E8'
}}
          onPress={() => { this.setState({ viewEvents: true }); }}
        >
          <Text style={{ fontSize: 12.3, fontWeight: '600', color: !this.state.viewEvents ? '#626567' : defaultGreen }}> Recent Events </Text>
        </TouchableOpacity>
      </View>
      {
            this.props.posts ?
              <View style={{ height: height * 0.6 }}>
                { this.state.viewEvents ? MultipleEvents([1, 2, 3])() : multiplePosts([...this.props.posts])({ height: height * 0.3, navigator: this.props.navigator, dispatch: this.props.dispatch })}
              </View>
            : null
          }
    </View>
  )
}

const DisplayBio = ({ user }) => (
  <View style={{ height: height * 0.2, width, marginBottom: 5 }}>
    {/* This should contain the image and name */}
    <View style={{
 height: height * 0.1, marginBottom: 10, width, flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'space-around'
}}
    >
      <Image
        style={{
 height: 90, width: 90, borderRadius: 45, position: 'relative', top: -30
}}
        source={{ uri: (user.avatar ? user.avatar : uri) }}
      />
      <View style={{
 width: width * 0.5, position: 'relative', left: -35, paddingTop: 10
}}
      >
        <Text style={{
 fontSize: 17, fontWeight: '600', marginBottom: 5, color: '#363636'
}}
        > {`${user.firstname} ${user.lastname}`}
        </Text>
        <Text style={{ fontSize: 12, fontWeight: '600', color: '#909497' }}>{` Ward ${user.ward} | Surulere ${user.lga}`} </Text>
      </View>
    </View>
    { /* Render the bio */}
    <Text style={{
 fontSize: 11.5, fontWeight: '500', color: '#909497', width: width * 0.9, alignSelf: 'flex-start', position: 'relative', right: -30
}}
    > Philosopher | Human Rights Activist...I believe n an urgent restoration of active and participatory democracy, social justiceand good leadership
    </Text>
  </View>
);

const ButtonStack = ({ user, handleMessage }) => (
  <View style={{
 width, height: height * 0.08, paddingRight: 16, paddingLeft: 16, flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'space-around'
}}>
    <TouchableOpacity style={{
 height: height * 0.04, width: width * 0.27, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#D0D3D4', borderRadius: 3
}}
    >
      <Text style={{ fontSize: 11, color: '#979A9A' }}><Text style={{ fontWeight: '600', color: '#626567' }}> { `${user.followers.length}`} </Text>Followers </Text>
    </TouchableOpacity>
    <TouchableOpacity style={{
 height: height * 0.04, alignItems: 'center', justifyContent: 'center', width: width * 0.27, borderWidth: 1, borderColor: '#D0D3D4', borderRadius: 3
}}
    >
      <Text style={{ fontSize: 11, color: '#979A9A' }}><Text style={{ fontWeight: '600', color: '#626567' }}> { `${user.friends.length}`} </Text>Following </Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={{
 height: height * 0.04, alignItems: 'center', justifyContent: 'center', width: width * 0.27, backgroundColor: defaultGreen, borderRadius: 3
}}
      onPress={handleMessage}
    >
      <Text style={{ fontSize: 11, color: '#fff' }}> Message </Text>
    </TouchableOpacity>
  </View>
);

const mapStateToProps = state => ({
  target: state.users.target,
  user: state.users.current,
  posts: state.posts.target
});

export default connect(mapStateToProps)(ShowUser);
