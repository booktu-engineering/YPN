import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux'
import { View } from 'react-native';
import { defaultGreen } from '../../mixins/';
import { multiplePosts } from '../SinglePost/';
import { fetchTimeline } from '../../actions/thunks/posts';
import { NotificationIcon, SearchIcon, LeftNav } from '../IconRegistry/'

class Home extends Component {
  constructor(props) {
    super(props);
    this.registerButtons();
  }

  componentDidMount = () => {
    // fetch the data here
    if(this.props.data) return;
    this.props.dispatch(fetchTimeline(this.props.navigator))
  }

// registering the buttons
NotificationIco = () => <NotificationIcon navigator={this.props.navigator} />
SearchIco = () => <SearchIcon navigator={this.props.navigator} />
LeftButton = () => <LeftNav navigator={this.props.navigator} />

  registerButtons = () => {
    Navigation.registerComponent('Left.Button', () => this.LeftButton)
    Navigation.registerComponent('Search.Button', () => this.SearchIco)
    Navigation.registerComponent('Notif.Button', () => this.NotificationIco);
  }

  render = () => {
    return (
      <View style={{ flex: 1 }}>
        { multiplePosts([ 1,2,3,4])({ navigator: this.props.navigator })}
      </View>
    )
  }
}


Home.navigatorStyle = {
  navBarBackgroundColor: defaultGreen,
  statusBarTextColorScheme: 'light',
  preferredContentSize: { height: 2000 }
}


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
}

const mapStateToProps = (state) => {
  return {
    data: state.posts.timeline
  }
}

export default connect(mapStateToProps)(Home);
