import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import { View, ActivityIndicator } from 'react-native';
import { defaultGreen } from '../../mixins/';
import { multiplePosts } from '../SinglePost/';
import { fetchTimeline } from '../../actions/thunks/posts';
import { NotificationIcon, SearchIcon, LeftNav } from '../IconRegistry/';
import { dispatchNotification } from '../../helpers/uploader';

let nav;

class Home extends Component {
  constructor(props) {
    super(props);
    nav = this.props.navigator;
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.props.navigator.setButtons({
      leftButtons: [
        {
          id: 'showNav',
          component: 'Left.Button', 
          passProps: {
              navigator: this.props.navigator
          }
        }
      ],
      rightButtons: [
        {
          id: 'NotificationPress',
          component: 'Notif.Button', 
          passProps: {
            navigator: this.props.navigator
        }
        },
        {
          id: 'Search',
          component: 'Search.Button', 
          passProps: {
            navigator: this.props.navigator, 
            dispatch: this.props.dispatch
        }
        },
      ]
    })
  }

  onNavigatorEvent = (e) => {
    if (e.id === 'didAppear') {
      return this.fetchTimeLine();
    } 
  }
  componentDidMount = () => {
    dispatchNotification(this.props.navigator)(`Hey, ${this.props.user.firstname}! what do you have to share?`);
    if (this.props.data) return;
    this.props.dispatch(fetchTimeline(this.props.navigator));
  }

fetchTimeLine = () => this.props.dispatch(fetchTimeline(this.props.navigator))


  render = () => (
    <View style={{ flex: 1 }}>
      { this.props.data ?
          multiplePosts([...this.props.data].reverse())({ navigator: this.props.navigator, dispatch: this.props.dispatch, refresh: this.fetchTimeLine }) :
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="small" color={`${defaultGreen}`} />
          </View>
        }
    </View>
  )
}


Home.navigatorStyle = {
  navBarBackgroundColor: defaultGreen,
  tabBarHidden: false,
  statusBarTextColorScheme: 'light',
  preferredContentSize: { height: 2000 }
};


const mapStateToProps = state => ({
  data: state.posts.timeline,
  user: state.users.current
});

export const HomeNavigator = () => nav;
export default connect(mapStateToProps)(Home);
