import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { TinySelectors, height, width, LoadingScreen } from '../../mixins';
import { ConversationObjects } from '../SingleConversation';
import { dispatchNotification, EndProcess } from '../../helpers/uploader';
import { fetchConversations } from '../../actions/thunks/conversations';

class Conversations extends Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.props.navigator.setButtons({
      leftButtons: [
        {
          id: 'Back.Button.C',
          component: 'Back.Button', 
          passProps: {
            navigator: this.props.navigator
          }
        }
      ],
      rightButtons: [
        {
          id: 'Search.Button',
          component: 'Search.Button', 
          passProps: {
            navigator: this.props.navigator
          }
        }
      ]
    });
  }

  onNavigatorEvent = (e) => {
    if(e.id === 'didAppear' && this.props.target) return this.props.navigator.dismissLightBox();
  }

  componentDidMount() {
    if(!this.props.target); {
      this.props.dispatch(fetchConversations(2, this.props.navigator))
      .then(() => EndProcess(this.props.navigator));
    }
  }

  componentWillUnmount = () => {
    this.props.navigator.setDrawerEnabled({ side: 'left', enabled: true });
    this.props.navigator.toggleTabs({ to: 'shown', animated: true });
  }

  render = () => (
    <View style={{ flex: 1}}> 
    {
      this.props.target ? <ConversationList data={this.props.target} dispatch={this.props.dispatch} navigator={this.props.navigator}/> : <View style={{ flex: 1}} />
    }
    </View>
  ) 
}

const ConversationList = (props) => (
  <View style={{ minHeight: height, width, paddingTop: 10 }}>
    <View style={{ maxHeight: height * 0.04, width, paddingRight: 15 }}>
      <TinySelectors keys={['Live']} />
    </View>
    { ConversationObjects([...props.data])({ navigator: props.navigator, dispatch: props.dispatch })}
  </View>
);

const mapStateToProps = (state) => {
  return {
    target: state.convos.specific
  };
};

export default connect(mapStateToProps)(Conversations);
