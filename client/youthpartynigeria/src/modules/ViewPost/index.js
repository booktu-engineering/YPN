import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { defaultGreen } from '../../mixins';
import SinglePost, { multiplePosts } from '../SinglePost';


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
  }

  componentWillUnmount = () => {
    this.props.navigator.setDrawerEnabled({ side: 'left', enabled: true });
  }

    render = () => (
      <ViewPost data={this.props.target} dispatch={this.props.dispatch} user={this.props.user} navigator={this.props.navigator} />
    )
}

const ViewPost = ({ data, dispatch, user, navigator }) => (
  <ScrollView style={{ flex: 1 }}>
    { data.referenceObject
      ? <SinglePost data={data.referenceObject} obj={{ user, dispatch, navigator, reference: true }} />
      : null
    }
    <SinglePost data={data} obj={{ user, dispatch, navigator, single: true }} />
    {
        data.references
          ? multiplePosts(data.references)({ user, dispatch, navigator, reference: true })
          : null
    }
  </ScrollView>
);


const mapStateToProps = state => ({
  user: state.users.current
});

ViewPostContainer.navigatorStyle = {
  tabBarHidden: true,
  navBarBackgroundColor: defaultGreen,
  statusBarTextColorScheme: 'light',
  preferredContentSize: { height: 2000 }
};

export default connect(mapStateToProps)(ViewPostContainer);