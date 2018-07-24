import React, { Component } from 'react';
import {
  View, TouchableOpacity, Image, Text, ScrollView
} from 'react-native';
import {
  height, width, defaultGreen, bigButton, buttonText
} from '../../../mixins';
import { CheckMarkIcon } from '../../IconRegistry';

const uri = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7DkkUNTMfEjuq8pyx6tqGyv8R8-mUf4zhbGw6Lqeai_KeI-sT';

class ElectionScreen extends Component {
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
  }

  state = {}

  handleSelect = target => this.setState({ target })

    renderItems = data => data.map((candidate, index) => (
      <TouchableOpacity
        style={{
          height: 79,
          width,
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 8
        }}
        onPress={() => this.handleSelect(index)}
      >
        <View
          style={{
            height: 50,
            width: width * 0.7,
            flexDirection: 'row'
          }}
        >
          <Image
            source={{ uri }}
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
Hasstrup Ezekiel

          </Text>
        </View>
        { /* The check mark */}
        { this.state.target === index
          ? <CheckMarkIcon color="#239B56" size={24} style={{ float: 'right', position: 'relative', top: -7, right: -15 }} />
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
          { this.renderItems([1, 2, 4])}
        </ScrollView>
        <TouchableOpacity style={{
          ...bigButton,
          position: 'absolute',
          bottom: 20
        }}
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

ElectionScreen.navigatorStyle = {
  navBarBackgroundColor: defaultGreen,
  statusBarTextColorScheme: 'light',
  tabBarHidden: true
};

export default ElectionScreen;
