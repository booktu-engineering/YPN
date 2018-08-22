import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ActivityIndicator } from 'react-native';
import { defaultGreen } from '../../mixins/';
import { multiplePosts } from '../SinglePost/';
import { fetchTimeline } from '../../actions/thunks/posts';
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
    this.state = {
      refreshing: false
    }
  }

  onNavigatorEvent = (e) => {
    if (e.id === 'didAppear') {
      return this.fetchTimeLine();
    } 
  }
  componentDidMount = () => {
    const { navigator } = this.props
    navigator.toggleTabs({ to: 'shown', animated: true });
    navigator.setDrawerEnabled({ side: 'left', enabled: true });
    dispatchNotification(this.props.navigator)(`Hey, ${this.props.user.firstname}! what do you have to share?`);
    if (this.props.data) return;
    this.props.dispatch(fetchTimeline(this.props.navigator));
  }

fetchTimeLine = () => this.props.dispatch(fetchTimeline(this.props.navigator))

refreshTimeline = () => {
  this.setState({ refreshing: true })
  this.fetchTimeLine()
  .then(() => this.setState({ refreshing: false }))
}
renderRefreshable = () => ({ 
  refreshable: true,
  refreshing: this.state.refreshing,
  onRefresh: this.refreshTimeline
})

  render = () => (
    <View style={{ flex: 1 }}>
      { this.props.data ?
          multiplePosts([...this.props.data])({ navigator: this.props.navigator, dispatch: this.props.dispatch, refresh: this.fetchTimeLine, user: this.props.user, ...this.renderRefreshable() }) :
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
