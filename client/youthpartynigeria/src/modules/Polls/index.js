import React from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { fetchAllQuestions } from '../../actions/thunks/polls';
import { dispatchNotification } from '../../helpers/uploader';
import { defaultGreen, height } from '../../mixins';
import RenderPollsComponent from './components/RenderPollsList';

class RenderPolls extends React.Component {
    static navigatorStyle = {
      navBarBackgroundColor: defaultGreen,
      statusBarTextColorScheme: 'light',
      navBarNoBorder: true,
      tabBarHidden: true,
    }

    constructor(props) {
      super(props);
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
      this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    componentDidMount = () => {
      const { data, dispatch, navigator } = this.props;
      if (!data) return dispatch(fetchAllQuestions(navigator));
      if (!data.length) {
        dispatchNotification(navigator)('Sorry there are no polls availble at this time');
        // navigator.pop();
      }
    }

    componentWillUnmount = () => {
      const { navigator } = this.props;
      navigator.setDrawerEnabled({ side: 'left', enabled: true });
      navigator.toggleTabs({ to: 'shown', animated: true });
    }

    onNavigatorEvent = (e) => {
      if (e.id === 'didAppear') {
        // check for updates from the server from time to time
        return this.props.dispatch(fetchAllQuestions(this.props.navigator, 1));
      }
    }

    render = () => (
      <React.Fragment>
        { this.props.data && this.props.data.length ? <RenderPollsComponent {...this.props} /> : <Text style={{ 
          fontSize: 14, 
          fontWeight: '600', 
          width: '80%',
          color: '#CACFD2', 
          alignSelf: 'center', 
          textAlign: 'center',
          position: 'relative', 
          bottom: -(height * 0.4) 
          }}>{`There are no polls available for you to participate in. Thank you`}</Text>}
      </React.Fragment>
    )
}

const mapStateToProps = state => ({
  data: state.questions.all && state.questions.all.filter(item => item.type && item.type === 1)
});

export default connect(mapStateToProps)(RenderPolls);
