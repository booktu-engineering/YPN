import React from 'react';
import { View } from 'react-native';
import Screen from '../../mixins/screen';
import { TinySelectors, height, width } from '../../mixins';
import { ConversationObjects } from '../SingleConversation';

class Conversations extends Screen {
  constructor(props){
    super(props, 'CON.Back.Button', 'CON.search.button')
  }

  componentWillUnmount = () => {
    this.props.navigator.setDrawerEnabled({ side: 'left', enabled: true });
    this.props.navigator.toggleTabs({ to: 'shown', animated: true });
  }

  render = () => <ConversationList navigator={this.props.navigator}/>
}

const ConversationList = (props) => (
  <View style={{ minHeight: height, width, paddingTop: 10 }}>
    <View style={{ maxHeight: height * 0.04, width, paddingRight: 15 }}>
      <TinySelectors keys={['Live']} />
    </View>
    { ConversationObjects([1,2,3,4,4,56,6,6])({ navigator: props.navigator})}
  </View>
)

Conversations.navigatorButtons = {
  leftButtons: [
    {
      id: 'Back.Button.C',
      component: 'CON.Back.Button'
    }
  ],
  rightButtons: [
    {
      id: 'Search.Button',
      component: 'CON.search.button'
    }
  ]
}
export default Conversations;
