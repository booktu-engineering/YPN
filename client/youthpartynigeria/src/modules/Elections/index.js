import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { fetchAllQuestions } from '../../actions/thunks/polls';
import { defaultGreen } from '../../mixins';
import RenderElections from './components/RenderElections';


class ElectionScreen extends Component {
  constructor(props) {
    super(props);
    const { navigator } = this.props;
    navigator.setButtons({
      leftButtons: [
        {
          id: 'Back.Nav.G',
          component: 'Back.Button',
          passProps: {
            navigator
          }
        }
      ]
    });
  }

  componentDidMount = () => {
    if (!this.props.elections) return this.props.dispatch(fetchAllQuestions(this.props.navigator));
  }

render = () => (
    <View style={{ flex: 1 }}>
    {
        this.props.elections ? <RenderElections dispatch={this.props.dispatch} navigator={this.props.navigator} data={this.props.elections}/> : null
    }
    </View>
)

}

ElectionScreen.navigatorStyle = {
  navBarBackgroundColor: defaultGreen,
  tabBarHidden: true,
  statusBarTextColorScheme: 'light'
};

const mapStateToProps = state =>({
  elections: state.questions.all && state.questions.all.filter(item => item.type === 2)
})

export default connect(mapStateToProps)(ElectionScreen);
