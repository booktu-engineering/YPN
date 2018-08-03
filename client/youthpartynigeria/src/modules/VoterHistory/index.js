import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';
import { dispatchNotification } from '../../helpers/uploader';
import { VerifyVin } from '../../actions/thunks/polls';
import { defaultGreen } from '../../mixins';
import { VerifiedComponent, NotVerifiedComponent } from './components';

class VerifyEligibility extends Component {
  constructor(props) {
    super(props);
    this.props.navigator.setButtons({
      leftButtons: [
        {
          id: 'showNav',
          component: 'Back.Button',
          passProps: {
            navigator: this.props.navigator,
            modal: true
          }
        }
      ]
    });
    this.state = {};
  }

    handleChange = vin => this.setState({ vin })

    handleSubmit = () => {
      if (!this.state.vin || !this.state.vin.length) return dispatchNotification(this.props.navigator)('Please fill in the right values. Thank you.');
      this.props.dispatch(VerifyVin(this.props.navigator)(this.state));
    }

    render = () => (
      <ScrollView>
        {
                this.props.user.vin
                  ? <VerifiedComponent navigator={this.props.navigator} />
                  : <NotVerifiedComponent handleChange={this.handleChange} handlePress={this.handleSubmit} />
            }
      </ScrollView>
    )
}

VerifyEligibility.navigatorStyle = {
  navBarBackgroundColor: defaultGreen,
  tabBarHidden: true,
  statusBarTextColorScheme: 'light',
};

const mapStateToProps = state => ({
  user: state.users.current
});

export default connect(mapStateToProps)(VerifyEligibility);
