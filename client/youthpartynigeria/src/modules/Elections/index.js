import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { height, width, defaultGreen } from '../../mixins';


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

render = () => <RenderElections navigator={this.props.navigator}/>
}


const RenderElections = ({ navigator }) => (
  <View style={{ flex: 1, paddingLeft: 20, paddingTop: 20 }}>
    <View style={{ height: 50, width: width * 0.9, alignItems: 'center' }}>
      <Text style={{ fontSize: 16, fontWeight: '500', color: '#626567' }}>
Primary Elections
      </Text>
    </View>
    { /* render the grid ting */}
    { /* Presidential election */}
    <TouchableOpacity style={{
        height: height * 0.13, paddingLeft: 15, paddingRight: 15, justifyContent: 'center', borderColor: '#B3B6B750', position: 'relative', borderBottomWidth: 0.3
      }}
      onPress={() => navigator.push({ screen: 'Voting.Screen', 
    title: 'Presidential Elections',
    passProps: {
        key: 1
    }
    })}
      >
        <Text style={{
          fontSize: 15, fontWeight: '600', color: '#626567', marginBottom: 10
        }}
        >
Presidential Elections
        </Text>
        <Text style={{ fontSize: 13, fontWeight: '500', color: '#B3B6B7' }}>
Federal
        </Text>
      </TouchableOpacity>
    { /* Senatorial election */}
    <TouchableOpacity style={{
        height: height * 0.13, paddingLeft: 15, paddingRight: 15, justifyContent: 'center', borderColor: '#B3B6B750', position: 'relative', borderBottomWidth: 0.3
      }}
      onPress={() => navigator.push({ screen: 'Voting.Screen', 
    title: 'Senatorial Elections',
    passProps: {
        key: 2
    }
    }) }
      >
        <Text style={{
          fontSize: 15, fontWeight: '600', color: '#626567', marginBottom: 10
        }}
        >
Senatorial Election
        </Text>
        <Text style={{ fontSize: 13, fontWeight: '500', color: '#B3B6B7' }}>
Lagos State
        </Text>
      </TouchableOpacity>
    { /* Chairmanship election */}
    <TouchableOpacity style={{
        height: height * 0.13, paddingLeft: 15, paddingRight: 15, justifyContent: 'center', borderColor: '#B3B6B750', position: 'relative', borderBottomWidth: 0.3
      }}
      onPress={() => navigator.push({ screen: 'Voting.Screen', 
      title: 'Senatorial Elections',
      passProps: {
          key: 3
      }
      }) }
      >
        <Text style={{
          fontSize: 15, fontWeight: '600', color: '#626567', marginBottom: 10
        }}
        >
Senatorial Election
        </Text>
        <Text style={{ fontSize: 13, fontWeight: '500', color: '#B3B6B7' }}>
Lagos State
        </Text>
      </TouchableOpacity>
  </View>
);

ElectionScreen.navigatorStyle = {
  navBarBackgroundColor: defaultGreen,
  tabBarHidden: true,
  statusBarTextColorScheme: 'light'
};
export default ElectionScreen;
