import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Image } from 'react-native';
import { fetchAllConversations } from '../../actions/thunks/conversations';
import { defaultGreen } from '../../mixins';
import { multipleChat } from '../SingleChat';
import QueueOps from '../../ops/MessageQueueOps';

let nav;

class ChatContainer extends Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.handleVisibility);
    this.props.navigator.setButtons({
      leftButtons: [
        {
          id: 'Back.button',
          component: 'Left.Button',
          passProps: {
            navigator: this.props.navigator
          }
        }
      ],
      rightButtons: [
        {
          id: 'blsns',
          component: 'Add.Button',
          passProps: {
            func: this.handleNavigate
          }
        }
      ]
    });
    this.state = {};
  }

  handlePopulateUnreads= async () => {
    // initialize the queuer
    this.queuer = await QueueOps((tray) => {
      this.needsToUpdate = true;
      this.setState({ unreads: tray })
    }, this.props.dispatch, this.props.navigator, this.props.activityMap);
    await this.queuer(this.props.user)({ fetch: true });

  }

  handleUpdateCache = async (target) => {
    this.state.unreads[target._id] = target.visited
    await this.queuer(this.props.user)({ remove: true, target: this.state.unreads });
  }

  handleNavigate = () => this.props.navigator.push({ screen: 'Show.Groups', title: 'Start a new conversation'  });

  componentDidMount = () => {
     this.props.dispatch(fetchAllConversations(this.props.navigator))
     this.handlePopulateUnreads();
    };

  shouldComponentUpdate = (nextProps) => {
    if(this.needsToUpdate)  {
      this.needsToUpdate = false;
      return true;
    }
    if(this.props.registry && JSON.stringify(this.props.registry) === JSON.stringify(nextProps.registry)) return false;
    return true
  }

  // componentDidUpdate = () => {

  // }
  handleVisibility = (e) => {
    if (e.id === 'didAppear') {
      this.props.navigator.setDrawerEnabled({ side: 'left', enabled: true });
      this.props.navigator.toggleTabs({ to: 'shown', animated: true });
      this.handlePopulateUnreads();
      return this.props.dispatch(fetchAllConversations(this.props.navigator));
    }
  }
  render = () => (
    <View style={{ flex: 1 }}>
      { this.props.logs ?
        <ChatComponent navigator={this.props.navigator} updateCache={this.handleUpdateCache}data={this.props.logs} user={this.props.user} unreads={this.state.unreads || []} registry={this.props.registry}/> : null
        }
    </View>
  )
}
const ChatComponent = ({ navigator, data, user, registry, updateCache, unreads }) => {
  nav = navigator;
  return (
    <View style={{ flex: 1 }}>
      { multipleChat(data)({ navigator, user, registry, unreads, updateCache })}
    </View>
  );
};


// remember to refactor this component
ChatContainer.navigatorStyle = {
  navBarBackgroundColor: defaultGreen,
  statusBarTextColorScheme: 'light',
  tabBarHidden: false
};


const mapStateToProps = state => ({
  registry: state.convos.registry,
  logs: state.convos.logs,
  user: state.users.current,
  activityMap: state.convos.activityMap
});
export const ChatNavigator = () => nav;
export default connect(mapStateToProps)(ChatContainer);
