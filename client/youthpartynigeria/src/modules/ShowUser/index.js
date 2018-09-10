import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, TouchableOpacity, AlertIOS } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { defaultGreen, height, width } from '../../mixins/';
import { multiplePosts } from '../SinglePost/';
import { MultipleEvents } from '../SingleEvent';
import { BackIcon } from '../IconRegistry/';
import { startPersonalConversation } from '../../actions/thunks/conversations';
import { followUser, updateUser } from '../../actions/thunks/user';
import { fetchEventsForUser } from '../../actions/thunks/events';
import { fetchUsersPosts } from '../../actions/thunks/posts';

const uri = 'https://res.cloudinary.com/dy8dbnmec/image/upload/v1535072474/logo.png';

class ShowUser extends Component {
  static navigatorStyle = {
    navBarBackgroundColor: defaultGreen,
    statusBarTextColorScheme: 'light',
    navBarNoBorder: true,
    tabBarHidden: true
  }

  constructor(props) {
    super(props);
    this.state = { viewEvents: false };
    this.props.navigator.setButtons({
      leftButtons: [
        {
          id: 'idd',
          component: 'Back.Button',
          passProps: {
            navigator: this.props.navigator
          }
        }
      ]
    })
    this.state = {
      message: 'Follow',
      target: false,
      posts: [],
      events: []
    };
  }


  componentDidMount = () => {
    // map the followers
    if (!this.props.target) return this.__getTheUser();
    this.setState({ target: this.props.target });
    this.__fetchPostsForUser()
    this.__fetchEventsForUser();
    if (this.props.posts) this.setState({ posts: this.props.posts });
    this.__setUpFollowers();
  }

  __fetchEventsForUser = () => {
    this.props.dispatch(fetchEventsForUser(this.props.target.id))
      .then(events => this.setState({ events }))
  }

  __setUpFollowers = () => {
    const friends = this.props.friends.map(item => item && item.id) || [];
    const followers = this.props.followers.map(item => item && item.id) || [];
    if (friends.includes(this.props.target.id)) return this.setState({ message: 'Following' });
  }

  __getTheUser = () => {
    updateUser(this.props.id, this.props.navigator)
      .then((target) => {
        this.setState({ target });
        this.__setUpFollowers();
        this.props.dispatch(fetchUsersPosts(target))
          .then((posts) => {
            this.setState({ posts });
          });
      });
  }

  __fetchPostsForUser = () => {
    this.props.dispatch(fetchUsersPosts(this.props.target))
    .then((posts) => {
      if(this.state.posts && this.state.posts.length === posts.length) return;

      this.setState({ posts });
    });
  }

  // componentWillUnmount = () => {
  //   this.props.navigator.setDrawerEnabled({ side: 'left', enabled: true });
  //   this.props.navigator.toggleTabs({ to: 'shown', animated: true });
  // }

    backIcon = () => <BackIcon navigator={this.props.navigator} />;

    handleInitMessage = () => {
      if (this.state.message === 'Follow') {
        this.props.dispatch(followUser(this.state.target)(this.props.navigator));
        return this.setState({ message: 'Following' });
      }
      AlertIOS.alert(
        `Are you sure you want to unfollow @${this.props.target.username}?`,
        '',
        [
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel',
          },
          {
            text: 'Yes, do it',
            onPress: () => {
              this.props.dispatch(followUser(this.state.target, "type=1")(this.props.navigator))
              this.setState({ message: 'Follow' })
            }
          },
        ]
      )
    };

    handleMessage = () => {
      this.props.dispatch(startPersonalConversation([this.props.target])(this.props.navigator));
    } 

    render = () => {
      if (!this.state.target) return (<View style={{ flex: 1 }} />);
      const { followers, target } = this.props;
      const status = followers.map(user => user.id).includes(target.id)
      return (
        <View style={{ flex: 1 }}>
           <View style={{ height: height * 0.08, backgroundColor: defaultGreen, flexDirection: 'column', width, paddingRight: 10, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
      {  status && <TouchableOpacity onPress={this.handleMessage} style={{ height: 40, width: 50, justifyContent: 'center', alignItems: 'center' }}><Icon name="ios-mail"  size={28} color="white" /></TouchableOpacity> }
      </View>

          <DisplayBio user={this.state.target} navigator={this.props.navigator}/>
          <ButtonStack user={this.state.target} handleMessage={this.handleInitMessage} message={this.state.message} navigator={this.props.navigator}/>
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
             this.state.posts.length ?
                <View style={{ height: height * 0.6, paddingTop: 5 }}>
                  { this.state.viewEvents ? MultipleEvents(this.state.events)({ navigator: this.props.navigator, dispatch: this.props.dispatch }) : multiplePosts([...this.state.posts ])({ height: height * 0.3, navigator: this.props.navigator, dispatch: this.props.dispatch, user: this.props.user })}
                </View>
               : null
            }
        </View>
      );
    }
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
        > {`${user.firstname || ''} ${user.lastname || ''}`}
        </Text>
        <Text style={{ fontSize: 12, fontWeight: '600', color: '#CACFD2', marginBottom: 5 }}>{`@${user.username || ''}`} </Text>
        <Text style={{ fontSize: 12, fontWeight: '600', color: '#909497' }}>{` Ward: ${user.ward || ''} | lga: ${user.lga || ''}`} </Text>
      </View>
    </View>
    { /* Render the bio */}
    <Text style={{
      fontSize: 12.5, fontWeight: '500', color: '#909497', width: width * 0.9, alignSelf: 'flex-start', position: 'relative', right: -30
    }}
    > { user.bio || '' }
    </Text>
  </View>
);

const ButtonStack = ({ user, handleMessage, message, navigator }) => (
  <View style={{
    width, height: height * 0.08, paddingRight: 16, paddingLeft: 16, flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'space-around'
  }}>
    <TouchableOpacity style={{
      height: height * 0.04, width: width * 0.27, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#D0D3D4', borderRadius: 3
    }}
onPress={() => { user && user.followers ? navigator.push({ screen: 'Show.Users', title: 'Followers', passProps: { data: user.followers }}) : null }}
    >
      <Text style={{ fontSize: 11, color: '#979A9A' }}><Text style={{ fontWeight: '600', color: '#626567' }}> { `${user && user.followers ? user.followers.length : 0}`} </Text>Followers </Text>
    </TouchableOpacity>
    <TouchableOpacity style={{
      height: height * 0.04, alignItems: 'center', justifyContent: 'center', width: width * 0.27, borderWidth: 1, borderColor: '#D0D3D4', borderRadius: 3
    }}
onPress={() => { user && user.friends ? navigator.push({ screen: 'Show.Users', title: 'Friends', passProps: { data: user.friends }}) : null }}
    >
      <Text style={{ fontSize: 11, color: '#979A9A' }}><Text style={{ fontWeight: '600', color: '#626567' }}> { `${user && user.friends ? user.friends.length : 0}`} </Text>Following </Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={{
        height: height * 0.04, alignItems: 'center', justifyContent: 'center', width: width * 0.27, backgroundColor: defaultGreen, borderRadius: 3
      }}
      onPress={handleMessage}
    >
      <Text style={{ fontSize: 11, color: '#fff' }}>{`${message}`} </Text>
    </TouchableOpacity>
  </View>
);

const mapStateToProps = state => ({
  user: state.users.current,
  // target: state.users.target,
  // posts: state.posts.target,
  followers: state.users.followers.filter(user => user) || [],
  friends: state.users.friends.filter(user => user) || []
});


export default connect(mapStateToProps)(ShowUser);
