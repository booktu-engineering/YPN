import React, { Component } from 'react';
import Screen from '../../mixins/screen';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { CustomHeader } from '../ShowConversation/'
import { height, width, defaultGreen } from '../../mixins/'
import MessageLog from '../Log';
import { messages } from './messages';
import { CameraIcon, SendIcon } from '../IconRegistry';

class ConversationLog extends Screen {
  constructor(props) {
    super(props, 'A.Test.Screen')
    this.state = {
      messages: []
    }
  }


  componentDidMount = () => {
        this.setState({
          messages: messages.normal
        })
      }

  render = () => (
    <View style={{ height, width }}>
      <CustomHeader navigator={this.props.navigator} data={{ origin: { name: 'Women Empowerment' }}} />
      <View style={{ height: height * 0.78, width}}>
        <MessageLog data={messages.normal} origin={messages.origin}/>
      </View>
      <InputButton />
  </View>
  )
}


const InputButton = () => (
  <View style={{ height: height * 0.07, width, flexDirection: 'row', flexWrap: 'nowrap', borderColor: '#D0D3D450', zIndex: 4, borderTopWidth: 1.2,}}>
    <TextInput
      style={{
        minHeight: height * 0.06,
        paddingLeft: 10,
        width: width * 0.7,
        color: '#7B7D7D',
        fontSize: 14,
        fontWeight: '500',
      }}
      placeholder="Type a message"
      placeholderTextColor="#D0D3D4"
      multiline={true}
      />
    <TouchableOpacity
      style={{
        height: height * 0.07,
        width: width * 0.15,
        justifyContent: 'center',
        alignItems: 'center'
      }}
      >
      <CameraIcon size={24} style={{}} color={`${defaultGreen}`}/>
    </TouchableOpacity>
    { /* send button */}
    <TouchableOpacity
      style={{
        height: height * 0.07,
        width: width * 0.15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: defaultGreen
      }}
      >
      <SendIcon size={25} color="white"/>
    </TouchableOpacity>

  </View>
)


ConversationLog.navigatorStyle = {
    navBarHidden: true
}

export default ConversationLog;
