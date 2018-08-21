import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { fetchConversations } from '../../actions/thunks/conversations';
import { ConversationObjects as MultipleConversations } from '../SingleConversation';
import { defaultGreen } from '../../mixins';

class RenderTownHalls extends Component {
    static navigatorStyle = {
      navBarBackgroundColor: defaultGreen,
      statusBarTextColorScheme: 'light',
      navBarNoBorder: true,
      tabBarHidden: true
    }

    constructor(props) {
      super(props);
      this.state = { townHalls: [] };
      this.state.townHalls = this.props.townHalls;
      const { navigator } = this.props;
      navigator.setDrawerEnabled({ side: 'left', enabled: false });
      navigator.setButtons({
        leftButtons: [
          {
            id: 'Back.button',
            component: 'Back.Button',
            passProps: {
              navigator
            }
          }
        ]
      });
    }

    componentDidMount = () => {
      const callback = (townHalls) => {
        this.setState({ townHalls });
        this.props.dispatch({ type: 'TOWN_HALLS_FETCHED', payload: townHalls });
      };
      if (!this.state.townHalls) return this.props.dispatch(fetchConversations(3, this.props.navigator, callback));
    }

    componentWillUnmount = () => {
      this.props.navigator.setDrawerEnabled({ side: 'left', enabled: true });
      this.props.navigator.toggleTabs({ to: 'shown', animated: true });
    }

    render = () => (
      <View style={{ flex: 1 }}>
        { this.state.townHalls && this.state.townHalls.length && MultipleConversations(this.state.townHalls)({ ...this.props })}
      </View>
    )
}


const mapStateToProps = state => ({
  townHalls: state.convos.townHalls
});

export default connect(mapStateToProps)(RenderTownHalls);
