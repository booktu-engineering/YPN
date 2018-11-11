import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import { MaterialIndicator } from 'react-native-indicators';
import { defaultGreen } from '../../mixins';
import SinglePost, { multiplePosts } from '../SinglePost';
import { fetchSinglePost } from '../../actions/thunks/posts';


class ViewPostContainer extends Component {
  constructor(props) {
    super(props);
    const { navigator } = this.props;
    navigator.setDrawerEnabled({ side: 'left', enabled: false });
    navigator.setButtons({
      leftButtons: [
        {
          id: 'button.back',
          component: 'Back.Button',
          passProps: {
            navigator
          }
        }
      ]
    });
    this.state = {};
  }


  componentDidMount = () => {
     this.promise1 = fetchSinglePost(this.props.target._id)
      .then((data) => {
        this.setState({ comments: data.comments || [], stoppedLoading: true });
      });
  }

  handleCallback = () => {
    this.promise2 = fetchSinglePost(this.props.target._id)
    .then((data) => {
      if(!this.promise2) return null;
      this.setState({ comments: data.comments || [], stoppedLoading: true });
    });
  }

  componentWillUnmount = () => {
    // doing this to prevent the anomalous behaviour
    this.promise1 = null; // 
    this.promise2= null
    this.setState({ stoppedLoading: false, comments: false });
    this.props.navigator.setDrawerEnabled({ side: 'left', enabled: true });
  }

  renderLoading = () => {
    return !this.state.stoppedLoading ? (
      <View style={{
        flex: 1, 
        backGroundColor: '#FBFBFC30', 
        justifyContent: 'center', 
        alignItems: 'center',
        position: 'relative',
        bottom: -50
      }}>
         <MaterialIndicator color={defaultGreen} size={20} />
      </View>
    ) : null
  }

  

    render = () => (
      <ViewPost 
      renderLoading={this.renderLoading} 
      data={this.props.target} 
      comments={this.state.comments} 
      dispatch={this.props.dispatch} 
      user={this.props.user} 
      friends={this.props.friendsIDs} 
      navigator={this.props.navigator} 
      callback={this.handleCallback}
      />
    )
}

const ViewPost = ({ renderLoading, data, dispatch, user, navigator, comments, friends, callback }) => (
  <ScrollView style={{ flex: 1 }}>
    { data.referenceObject
      ? <SinglePost data={data.referenceObject} obj={{ user, dispatch, navigator, reference: true, friends, callback }} />
      : null
    }
    <SinglePost data={data} obj={{ user, dispatch, navigator, single: true, friends, callback }} />
    {
       comments
          ? multiplePosts(comments)({ user, dispatch, navigator, reference: true, friends, callback })
          : renderLoading()
    }
  </ScrollView>
);


const mapStateToProps = state => ({
  user: state.users.current,
  friendsIDs: state.users.friendsIDs
});

ViewPostContainer.navigatorStyle = {
  tabBarHidden: true,
  navBarBackgroundColor: defaultGreen,
  statusBarTextColorScheme: 'light',
  preferredContentSize: { height: 2000 }
};

export default connect(mapStateToProps)(ViewPostContainer);