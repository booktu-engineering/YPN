import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { fetchConversations } from '../../actions/thunks/conversations';
import { ConversationObjects as MultipleConversations } from '../SingleConversation';
import { defaultGreen, height } from '../../mixins';
import { EndProcess } from '../../helpers/uploader';

class RenderTownHalls extends Component {
    static navigatorStyle = {
      navBarBackgroundColor: defaultGreen,
      statusBarTextColorScheme: 'light',
      navBarNoBorder: true,
      tabBarHidden: true
    }

    // SOUTHERN IJAW
    constructor(props) {
      super(props);
      this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
      this.state = { townHalls: [] };
      this.state.townHalls = this.props.townHalls && this.props.townHalls.filter(tH => tH.details.location.includes(this.props.user.ward));
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

    onNavigatorEvent = (e) => {
      if (e.id === 'didAppear' && this.state.townHalls) return this.props.navigator.dismissLightBox();
    }

    componentDidMount = () => {
      const callback = (townHalls) => {
        EndProcess(this.props.navigator);
        this.setState({ townHalls: townHalls.filter(tH => tH.details.location.includes(this.props.user.ward)) });
        this.props.dispatch({ type: 'TOWN_HALLS_FETCHED', payload: townHalls });
      };
      if (!this.state.townHalls) return this.props.dispatch(fetchConversations(3, this.props.navigator, callback));
    }

    componentWillUnmount = () => {
      this.props.navigator.setDrawerEnabled({ side: 'left', enabled: true });
      this.props.navigator.toggleTabs({ to: 'shown', animated: true });
    }

    render = () => (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        { this.state.townHalls && this.state.townHalls.length ? MultipleConversations(this.state.townHalls)({ ...this.props }) : null }
        <Text style={{ 
          fontSize: 14, 
          fontWeight: '600', 
          color: '#CACFD2', 
          alignSelf: 'center', 
          textAlign: 'center',
          position: 'relative', 
          bottom: -(height * 0.4) 
          }}>{`There are no town halls available for your ward (${this.props.user.ward || ''})`}</Text>
      </View>
    )
}


const mapStateToProps = state => ({
  townHalls: state.convos.townHalls,
  user: state.users.current
});

export default connect(mapStateToProps)(RenderTownHalls);
