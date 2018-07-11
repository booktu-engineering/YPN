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
    this.registerButtons();
    nav = this.props.navigator;
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent = (e) => {
    if (e.id === 'didAppear') return this.fetchTimeLine();
  }
  componentDidMount = () => {
    // fetch the data here
    dispatchNotification(this.props.navigator)(`Hey, ${this.props.user.firstname}! what do you have to share?`);
    if (this.props.data) return;
    this.props.dispatch(fetchTimeline(this.props.navigator));
  }

fetchTimeLine = () => this.props.dispatch(fetchTimeline(this.props.navigator))

// registering the buttons
NotificationIco = () => <NotificationIcon navigator={this.props.navigator} />
SearchIco = () => <SearchIcon navigator={this.props.navigator} />
LeftButton = () => <LeftNav navigator={this.props.navigator} />

  registerButtons = () => {
    Navigation.registerComponent('Left.Button', () => this.LeftButton);
    Navigation.registerComponent('Search.Button', () => this.SearchIco);
    Navigation.registerComponent('Notif.Button', () => this.NotificationIco);
  }

  render = () => (
    <View style={{ flex: 1 }}>
      { this.props.data ?
          multiplePosts([...this.props.data].reverse())({ navigator: this.props.navigator, dispatch: this.props.dispatch }) :
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="small" color={`${defaultGreen}`} />
          </View>
        }
    </View>
  )
}


Home.navigatorStyle = {
  navBarBackgroundColor: defaultGreen,
  statusBarTextColorScheme: 'light',
  preferredContentSize: { height: 2000 }
};


Home.navigatorButtons = {
  leftButtons: [
    {
      id: 'showNav',
      component: 'Left.Button'
    }
  ],
  rightButtons: [
    {
      id: 'NotificationPress',
      component: 'Notif.Button'
    },
    {
      id: 'Search',
      component: 'Search.Button'
    },
  ]
};

const mapStateToProps = state => ({
  data: state.posts.timeline,
  user: state.users.current
});

export const HomeNavigator = () => nav;
export default connect(mapStateToProps)(Home);
