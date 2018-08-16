import React from 'react';
import { connect } from 'react-redux';
import { fetchAllQuestions } from '../../actions/thunks/polls';
import { dispatchNotification } from '../../helpers/uploader';
import { defaultGreen } from '../../mixins';
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
    }

    componentDidMount = () => {
      const { data, dispatch, navigator } = this.props;
      if (!data) return dispatch(fetchAllQuestions(navigator));
      if (!data.length) {
        dispatchNotification(navigator)('Sorry there are no polls availble at this time');
        navigator.pop();
      }
    }

    componentWillUnmount = () => {
      const { navigator } = this.props;
      navigator.setDrawerEnabled({ side: 'left', enabled: true });
      navigator.toggleTabs({ to: 'shown', animated: true });
    }

    render = () => (
      <React.Fragment>
        { this.props.data && this.props.data.length && <RenderPollsComponent {...this.props} />}
      </React.Fragment>
    )
}

const mapStateToProps = state => ({
  data: state.questions.all && state.questions.all.filter(item => item.type && item.type === 1)
});

export default connect(mapStateToProps)(RenderPolls);
