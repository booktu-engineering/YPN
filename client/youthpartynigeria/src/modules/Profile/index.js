import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { defaultGreen, height, width } from '../../mixins/';
import { multiplePosts } from '../SinglePost/';
import { MultipleEvents } from '../SingleEvent';
import { fetchUsersPosts } from '../../actions/thunks/posts';
import { fetchEventsForUser } from '../../actions/thunks/events/';

const uri = 'https://res.cloudinary.com/dy8dbnmec/image/upload/v1535072474/logo.png';
let nav;
class ProfileComponent extends Component {

static navigatorStyle = {
  navBarBackgroundColor: defaultGreen,
  statusBarTextColorScheme: 'light',
  navBarNoBorder: true,
  tabBarHidden: false,
}


constructor(props) {
  super(props);
  this.state = {
    viewEvents: false,
    posts: []
  };
  nav = this.props.navigator;
  this.props.navigator.setOnNavigatorEvent(this.handleEvent.bind(this));
  this.props.navigator.setButtons({
    leftButtons: [
      {
        id: 'showNav',
        component: 'Left.Button', 
        passProps: {
          navigator: this.props.navigator
        }
      }
    ]
  })
}

componentDidMount = () => {
  const { navigator } = this.props
  if(!this.state.events) return this.fetchEventsForCurrentUser()
}

fetchEventsForCurrentUser = () => {
  this.props.dispatch(fetchEventsForUser(this.props.target.id))
  .then(events => this.setState({ events }));
}

  handleEvent = () => {
    this.props.dispatch(fetchUsersPosts(this.props.target))
      .then((posts) => {
        console.log('here');
        if(this.state.posts && this.state.posts.length === posts.length) return;
        this.setState({ posts });
      });
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    if(JSON.stringify(this.state) !== JSON.stringify(nextState)) return true;
    if((JSON.stringify({ ...nextProps.target }) === JSON.stringify({ ...this.props.target })) && nextState.posts.length === this.state.posts.length ) return false;
    return true;
  }
  render = () => (
    <View style={{ flex: 1, position: 'relative' }}>
      <View style={{ height: height * 0.08, backgroundColor: defaultGreen, flexDirection: 'column', width }}>
      </View>
      <DisplayBio user={this.props.target} navigator={this.props.navigator} />
      <ButtonStack followers={this.props.followers} friends={this.props.friends} navigator={this.props.navigator} dispatch={this.props.dispatch}/>
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
      <View style={{ height: height * 0.6, paddingTop: 5 }}>
        { this.state.viewEvents ? MultipleEvents(this.state.events)({ navigator: this.props.navigator, dispatch: this.props.dispatch }) : multiplePosts(this.state.posts)({ height: height * 0.3, user: this.props.target, dispatch: this.props.dispatch, navigator: this.props.navigator })}
      </View>
    </View>
  )
}


const DisplayBio = ({ user, navigator }) => (
  <View style={{ height: height * 0.2, width, marginBottom: 5 }}>
    {/* This should contain the image and name */}
    <View style={{
      height: height * 0.1, marginBottom: 10, width, flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'space-around'
    }}
    >
     <TouchableOpacity
       style={{
        height: 90, 
        width: 90, 
        borderRadius: 45, 
        position: 'relative', 
        top: -30
    }}
    onPress={() => { navigator.showLightBox({ screen: 'Show.Image', passProps: { data: [(user.avatar || uri )]}})}}
    > 
    <Image
        style={{
        height: 90, 
        width: 90, 
        borderRadius: 45,
        backgroundColor: 'white',
        resizeMode: (user.avatar ? 'cover' : 'center')
    }}
        source={{ uri: (user.avatar ? user.avatar : uri) }}
      />
    </TouchableOpacity>
      <View style={{
        width: width * 0.5, position: 'relative', left: -35, paddingTop: 10
      }}
      >
        <Text style={{
          fontSize: 17, fontWeight: '600', marginBottom: 5, color: '#363636'
        }}
        > {`${user.firstname} ${user.lastname}`}
        </Text>
        <Text style={{ fontSize: 12, fontWeight: '600', color: '#CACFD2', marginBottom: 5 }}>{`@${user.username || ''}`} </Text>
        <Text style={{ fontSize: 12, fontWeight: '600', color: '#909497' }}>{` Ward: ${user.ward || ''} | LGA: ${user.lga || ''}`} </Text>
      </View>
    </View>
    { /* Render the bio */}
    <Text style={{
      fontSize: 12.5, fontWeight: '500', color: '#909497', width: width * 0.9, alignSelf: 'flex-start', position: 'relative', right: -30
    }}
    > { user.bio || ''}
    </Text>
  </View>
);

const ButtonStack = ({ followers, friends, navigator }) => (
  <View style={{
    width, height: height * 0.08, paddingRight: 16, paddingLeft: 16, flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'space-around'
  }}>
    <TouchableOpacity style={{
      height: height * 0.04, width: width * 0.27, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#D0D3D4', borderRadius: 3
    }}
   onPress={() => { friends ? navigator.push({ screen: 'Show.Users', title: 'Followers', passProps: { data: followers }}) : null }}
   >
      <Text style={{ fontSize: 11, color: '#979A9A' }}><Text style={{ fontWeight: '600', color: '#626567' }}> { `${ followers ? followers.length : '' }`} </Text>Followers </Text>
    </TouchableOpacity>
    <TouchableOpacity style={{
      height: height * 0.04, alignItems: 'center', justifyContent: 'center', width: width * 0.27, borderWidth: 1, borderColor: '#D0D3D4', borderRadius: 3
    }}
onPress={() => { friends ? navigator.push({ screen: 'Show.Users', title: 'Friends', passProps: { data: friends }}) : null }}
    >
      <Text style={{ fontSize: 11, color: '#979A9A' }}><Text style={{ fontWeight: '600', color: '#626567' }}> { `${ friends ? friends.length : '' }`} </Text>Following </Text>
    </TouchableOpacity>
    <TouchableOpacity style={{
      height: height * 0.04, alignItems: 'center', justifyContent: 'center', width: width * 0.27, backgroundColor: defaultGreen, borderRadius: 3
    }}
    onPress={() => navigator.push({ screen: 'Update.Profile', title: 'Update your profile' })}
    >
      <Text style={{ fontSize: 11, color: '#fff' }}>Edit Profile</Text>
    </TouchableOpacity>
  </View>
);


const mapStateToProps = state => ({
  target: state.users.current,
  followers: state.users.followers ? state.users.followers.filter(user => user) : [],
  friends: state.users.friends ? state.users.friends.filter(user => user) : []
});
export const ProfileNavigator = () => nav;
export default connect(mapStateToProps)(ProfileComponent);
