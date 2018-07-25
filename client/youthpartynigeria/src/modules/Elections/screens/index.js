import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Image, Text, ScrollView } from 'react-native';
import { height, width, defaultGreen, bigButton, buttonText } from '../../../mixins';
import { CheckMarkIcon } from '../../IconRegistry';
import { VoteResponse } from '../../../actions/thunks/polls'

const uri = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7DkkUNTMfEjuq8pyx6tqGyv8R8-mUf4zhbGw6Lqeai_KeI-sT';

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
    this.state = {
      id: this.props.target._id,
    }
  }

  generateReasonsAndResponses = () => {
    let ref = {};
    Object.keys(this.props.target.questions).forEach(q => {
      ref[`${q}`] = ''
    })
    const responses = [ref];
    this.setState({ responses, reasons: responses });
    // the state should look like this;
    // { id: 65755859993, reasons: [ { 0: '}], responses: [{ 0: '' }]}

  }

  componentDidMount = () => {
    this.generateReasonsAndResponses();
  }

  handleSelect = target => {
    let ref = {}
    this.setState({ target })
    ref['0'] = target
    const response = [ref]
    this.setState({ responses: response })
  }

  handleSubmit = () => {
    this.props.dispatch(VoteResponse(this.props.navigator)(this.state));
  }

    renderItems = data => this.props.target.meta.candidates.map((candidate) => {
      return (
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
            ? <CheckMarkIcon color="#239B56" size={24} style={{ float: 'right', position: 'relative', top: -7, right: -15 }} />
            : null
      }
        </TouchableOpacity>
      )
    })

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
          { this.renderItems([this.props.target.meta.candidates])}
        </ScrollView>
        <TouchableOpacity style={{
          ...bigButton,
          position: 'absolute',
          bottom: 20
        }}
        onPress={() => { this.handleSubmit()}}
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
  target: state.questions.target
});

VotingScreen.navigatorStyle = {
  navBarBackgroundColor: defaultGreen,
  statusBarTextColorScheme: 'light',
  tabBarHidden: true
};

export default connect(mapStateToProps)(VotingScreen);
