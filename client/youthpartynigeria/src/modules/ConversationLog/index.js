import React from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import AwesomeList from 'react-native-awesome-list';
import { View, KeyboardAvoidingView, TouchableOpacity, TextInput, FlatList, ScrollView } from 'react-native';
import Screen from '../../mixins/screen';
import { CustomHeader } from '../ShowConversation';
import { height, width, defaultGreen } from "../../mixins";
import config from "../../config";
import { MessageComponent } from '../Log';
import { updateConversation, incomingMessage, sendMessage, LeaveConversation } from '../../actions/thunks/conversations';
import { CameraIcon, SendIcon } from '../IconRegistry';
import { dispatchNotification } from '../../helpers/uploader';

class ConversationLog extends Screen {
  constructor(props) {
    super(props, 'A.Test.Screen');
    this.state = {
      messages: [],
      content: ''
    };
    this.socket = io(`${config.realTimeUrl}/conversation`, { path: "/socket.io", query: { convoID: this.props.data._id } });
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.registerEvents();
    // this.textInput = CReact.createRef();
  }

  onNavigatorEvent = (e) => {
    if(e.id === 'didAppear') {
      this.props.navigator.setDrawerEnabled({ side: 'left', enabled: false });
      setTimeout(() => this.mounted &&  this.props.navigator.toggleTabs({ to: 'hidden', animated: true }), 500);
      this.props.navigator.setStyle({ tabBarHidden: true });
      
    }
  }

  componentDidMount = () => {
    this.mounted = true
    const messages = this.props.registry[`${this.props.data._id}`];
    this.mounted && this.setState({ messages });
    this.promise = this.props.dispatch(updateConversation(this.props.data._id)(this.props.navigator))
      .then((data) => {
        this.mounted && this.setState({ messages: data });
        if (this.props.reference) {
          // set state is async so this should work fine
          this.state.content = ' '; // this is us exploiting a bug MUHAHAHAHA
          this.handleSubmit(this.props.reference);
        }
      });
  }

  componentWillUnmount = () => {
    this.mounted = false;
    // this.props.navigator.setDrawerEnabled({ side: 'left', enabled: true });
    // this.props.navigator.toggleTabs({ to: 'shown', animated: true });
  }

  handleChange = content => this.setState({ content })

  handleSubmit = (reference) => {
    if (!reference) {
      this.setState({ content: '' });
    }
    if (this.state.content.length < 1) return dispatchNotification(this.props.navigator)(`Hey ${this.props.user.firstname}, you have to say something`);
    // prepare the message // it should like the posts
    let message = {
      content: this.state.content,
      origin: this.props.user,
      type: 2,
      destination: this.props.data._id,
      createdAt: Date.now(),

    };
    if (reference) {
      message = { ...message, referenceObject: reference, referenceID: reference._id };
    }
    const messages = [message, ...this.state.messages];
    this.setState({ messages });
    this.props.dispatch(sendMessage({ ...message, token: this.props.token }, this.socket)(this.props.navigator));
  }

  registerEvents = () => {
    this.socket.on('incoming-message', (data) => {
      const messages = [data, ...this.state.messages];
      this.mounted && this.setState({ messages });
      this.props.dispatch(incomingMessage(data));
    });
  }

  deets = () => this.props.registry[`${this.props.data._id}`].reverse()

  render = () => (
    <View style={{ height, width, justifyContent: 'space-between' }} >
      <CustomHeader navigator={this.props.navigator} data={this.props.data} user={this.props.user} dispatch={this.props.dispatch} />
      <KeyboardAvoidingView style={{ flex: 1 }}behavior="padding">
        { this.state.messages.length
        ?
        <View style={{ flex: 1, flexGrow: 2, }}> 
        {/* <AwesomeList 
          inverted
          data={this.state.messages}
          renderItem={(item) => <MessageComponent origin={this.props.user} data={item} user={this.props.user} navigator={this.props.navigator} focus={this.props.data.focus}/>}
          keyExtractor={(item, index) => item._id}
          extraData={this.state}
          removeClippedSubviews={false}
        /> */}
          <FlatList
          inverted
          // automaticallyAdjustContentInsets={false}
          ref={(ref) => { this.flatlistRef = ref; }}
          data={this.state.messages}
          contentContainerStyle={{
            flexDirection: 'column',
            justifyContent: 'space-around',
            paddingBottom: 20,
            paddingLeft: 10,
            paddingRight: 10
          }}
          renderItem={({ item }) => <MessageComponent origin={this.props.user} data={item} user={this.props.user} navigator={this.props.navigator} focus={this.props.data.focus}/>}
          keyExtractor={(item, index) => item._id}
          extraData={this.state}
          // removeClippedSubviews={false}
        />
        </View> 
        : <KeyboardAvoidingView style={{ flex: 10 }} behavior="padding" />
      }
        <View
style={{
        height: height * 0.08, 
        width, 
        flexDirection: 'row', 
        flexWrap: 'nowrap', 
        borderColor: '#D0D3D450', 
        zIndex: 4, 
        borderTopWidth: 1.2,
      }}
      >
        <TextInput
      style={{
        height: height * 0.06,
        paddingLeft: 10,
        width: width * 0.8,
        color: '#7B7D7D',
        fontSize: 14,
        fontWeight: '500',
        backgroundColor: 'white'
      }}
      onChangeText={(text) => { this.handleChange(text); }}
      placeholder="Type a message"
      ref={(ref) => { this.textInput = ref; }}
      placeholderTextColor="#D0D3D4"
      multiline
      value={this.state.content}
    />
        { /* send button */}
        <TouchableOpacity
      style={{
        height: height * 0.085,
        width: width * 0.18,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: defaultGreen,
        marginLeft: 5
      }}
      onPress={() => { this.handleSubmit(); }}
    >
      <SendIcon size={25} color="white" />
    </TouchableOpacity>
      </View>
      </KeyboardAvoidingView>
    </View>
  )
}


const InputButton = ({ handleChange, handleSubmit }) => (
  <View
style={{
    height: height * 0.08, width, flexDirection: 'row', flexWrap: 'nowrap', borderColor: '#D0D3D450', zIndex: 4, borderTopWidth: 1.2,
  }}
    behavior="height"
  >
    <TextInput
      style={{
        minHeight: height * 0.06,
        paddingLeft: 10,
        width: width * 0.7,
        color: '#7B7D7D',
        fontSize: 14,
        fontWeight: '500',
      }}
      onChangeText={(text) => { handleChange(text); }}
      placeholder="Type a message"
      placeholderTextColor="#D0D3D4"
      multiline
      editable
    />
    <TouchableOpacity
      style={{
        height: height * 0.07,
        width: width * 0.15,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <CameraIcon size={24} style={{}} color={`${defaultGreen}`} />
    </TouchableOpacity>
    { /* send button */}
    <TouchableOpacity
      style={{
        height: height * 0.085,
        width: width * 0.15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: defaultGreen
      }}
      onPress={() => { handleSubmit(); }}
    >
      <SendIcon size={25} color="white" />
    </TouchableOpacity>

  </View>
);


ConversationLog.navigatorStyle = {
  navBarHidden: true,
  tabBarHidden: true,
  drawUnderTabBar: true
};

const mapStateToProps = state => ({
  logs: state.convos.logs,
  registry: state.convos.registry,
  user: state.users.current,
  token: state.users.token,
  activity: state.convos.activityMap
});

export default connect(mapStateToProps)(ConversationLog);
