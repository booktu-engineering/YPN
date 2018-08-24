import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View, TouchableOpacity, Image, Text, ScrollView
} from 'react-native';
import {
  height, width, defaultGreen, bigButton, buttonText
} from '../../../mixins';
import { CheckMarkIcon } from '../../IconRegistry';
import { dispatchNotification } from '../../../helpers/uploader';
import { VoteResponse, checkIfUniqueVoter } from '../../../actions/thunks/polls';

const uri = 'https://res.cloudinary.com/dy8dbnmec/image/upload/v1535072474/logo.png';

class VotingScreen extends Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.handleVisibility);
    this.props.navigator.setButtons({
      leftButtons: [
        {
          id: 'Back.button',
          component: 'Back.Button',
          passProps: {
            navigator: this.props.navigator
          }
        }
      ]
    });
    this.state = { id: this.props.target._id };
  }

  generateReasonsAndResponses = () => {
    const ref = {};
    Object.keys(this.props.target.questions).forEach((q) => {
      ref[`${q}`] = '';
    });
    const responses = [ref];
    this.setState({ responses, reasons: responses });
  }

  componentDidMount = () => {
    this.generateReasonsAndResponses();
    this.setState({ processed: true });
  }

  handleSelect = (target) => {
    const ref = {};
    this.setState({ target });
    ref['0'] = target;
    const response = [ref];
    this.setState({ responses: response });
  }

  handleSubmit = () => {
    // prevent the user from voting and immediately prompt to sign up
    if (this.props.user.role < 1) {
      dispatchNotification(this.props.navigator)('Sorry, you need to be a party member to vote');
      return this.props.navigator.toggleDrawer({
        side: 'left',
        animated: true,
        to: 'open'
      });
    }
    // check if the user has a vin
    if (!this.props.user.vin) {
      dispatchNotification(this.props.navigator)('Sorry, you need to set up your VIN to vote');
      return this.props.navigator.pop();
    }
    if (!this.state.target) return dispatchNotification(this.props.navigator)('Please select a candidate');
    return this.props.dispatch(checkIfUniqueVoter(this.props.navigator)(this.props.target._id)(this.state));
  }

    renderItems = data => this.props.target.meta.candidates.map(candidate => (
      <TouchableOpacity
        style={{
            height: 79,
            width,
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 8
          }}
        onPress={() => this.handleSelect(candidate.name)}
        >
          <View
            style={{
              height: 50,
              width: width * 0.7,
              flexDirection: 'row'
            }}
          >
            <Image
              source={{ uri: candidate.avatar }}
              style={{
                height: 40,
                width: 40,
                borderRadius: 20,
                marginRight: 15
              }}
            />
            <Text
              style={{
                fontSize: 14,
                fontWeight: '600',
                color: '#404141',
                position: 'relative',
                bottom: -10
              }}
            >
              { candidate.name}
            </Text>
          </View>
          { /* The check mark */}
          { this.state.target === candidate.name
            ? <CheckMarkIcon color="#239B56" size={24} style={{
 float: 'right', position: 'relative', top: -7, right: -15 
}} />
            : null
      }
        </TouchableOpacity>
    ))

    render = () => (
      <View style={{
        flex: 1,
        paddingTop: 30,
        paddingLeft: 30
      }}
      >
        <Text style={{
          fontSize: 16,
          fontWeight: '600',
          color: '#2E2F2F',
          height: 30,
          width,
          marginBottom: 15
        }}
        >
          {' '}
Select your desired Candidate
          {' '}

        </Text>
        { /* the user card */}
        <ScrollView
          style={{
            maxHeight: height * 0.4,
            width,
          }}
        >
          { this.state.processed ? this.renderItems([this.props.target.meta.candidates]) : null}
        </ScrollView>
        <TouchableOpacity
          style={{
  ...bigButton,
  position: 'absolute',
  bottom: 20
}}
          onPress={() => { this.handleSubmit(); }}
        >
          <Text style={{ ...buttonText }}>
            {' '}
CONFIRM SELECTION
            {' '}
          </Text>
        </TouchableOpacity>
      </View>
    )
}

const mapStateToProps = state => ({
  target: state.questions.target,
  user: state.users.current
});

VotingScreen.navigatorStyle = {
  navBarBackgroundColor: defaultGreen,
  statusBarTextColorScheme: 'light',
  tabBarHidden: true
};

export default connect(mapStateToProps)(VotingScreen);
