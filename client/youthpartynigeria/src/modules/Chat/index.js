import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Image } from 'react-native';
import { fetchAllConversations } from '../../actions/thunks/conversations';
import { defaultGreen } from '../../mixins';
import { multipleChat } from '../SingleChat';

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
  }

  handleNavigate = () => this.props.navigator.push({ screen: 'Show.Groups', title: 'Start a new conversation'  });
  
  componentDidMount = () => this.props.dispatch(fetchAllConversations(this.props.navigator));
  handleVisibility = (e) => {
    if (e.id === 'didAppear') {
      return this.props.dispatch(fetchAllConversations(this.props.navigator));
    }
  }
  render = () => (
    <View style={{ flex: 1 }}>
      { this.props.logs ?
        <ChatComponent navigator={this.props.navigator} data={this.props.logs} user={this.props.user} registry={this.props.registry}/> : null
        }
    </View>
  )
}
const ChatComponent = ({ navigator, data, user, registry }) => {
  nav = navigator;
  return (
    <View style={{ flex: 1 }}>
      { multipleChat(data)({ navigator, user, registry })}
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
  user: state.users.current
});
export const ChatNavigator = () => nav;
export default connect(mapStateToProps)(ChatContainer);
