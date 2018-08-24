import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import { dispatchNotification } from '../../helpers/uploader';
import { attendEvent, leaveEvent } from '../../actions/thunks/events';
import { height, width, bigButton, buttonText } from '../../mixins';

const uri = 'https://res.cloudinary.com/dy8dbnmec/image/upload/v1535072474/logo.png';

class ShowEvent extends Component {
  constructor(props) {
    super(props)
    const { navigator } =  this.props
    navigator.setDrawerEnabled({ side: 'left', enabled: false });
    navigator.setButtons({
      leftButtons: [
        {
          id: 'nacv', 
          component: 'Back.Button', 
          passProps: {
            navigator
          }
        }
      ], 
      rightButtons: [
        {
          id: 'searchButton', 
          component: 'Search.Button', 
          passProps: {
            navigator
          }
        }
      ]
    })
  }

  handlePress = (a, b) => {
    if(b) return this.props.dispatch(leaveEvent(this.props.target._id)(this.props.navigator));
    if (a) return this.props.dispatch(attendEvent(this.props.target._id)(this.props.navigator))
    dispatchNotification(this.props.navigator)('Okay. Got it.')
    this.props.navigator.pop(); 
  } 
 
render = () => <RenderEvent data={this.props.target} handlePress={this.handlePress} user={this.props.user} />
}

const RenderEvent = ({ data, handlePress, user }) => (
  <View style={{  flex: 1 }}>
    <View style={{ height: height * 0.3, width, alignItems: 'center', justifyContent: 'center', borderBottomColor: '#D0D3D420', borderBottomWidth: 1 }}>
      <Image style={{ height: 76, width: 76, borderRadius: 38, marginBottom: 15 }} source={{ uri: data.details.displayPicture || uri }}/>
      <Text style={{ fontSize: 17, fontWeight: '600', color: '#191A1A', marginBottom: 10}}> {data.name}</Text>
      <Text style={{ fontSize: 13, fontWeight: '600', color: '#B3B6B7', marginBottom: 8}}> { moment(data.startDate).format('LLLL')}</Text>
      <Text style={{ fontSize: 13, fontWeight: '600', color: '#B3B6B7', marginBottom: 8}}> {data.details.time || ''}</Text>
</View>
<View style={{ height: height * 0.35, width, paddingLeft: 25, paddingTop: 25 }}>
  <Text style={{ fontSize: 14, fontWeight: '600', color: '#191A1A', marginBottom: 8}}> Location </Text>
  <Text style={{ fontSize: 12.5, fontWeight: '400', color: '#979A9A', marginBottom: 28}}> {data.details.location} </Text>
  <Text style={{ fontSize: 14, fontWeight: '600', color: '#191A1A', marginBottom: 8}}> Event Details </Text>
  <Text style={{ fontSize: 12.5, fontWeight: '400', color: '#979A9A', width: width * 0.86}}> 
  { data.details.description }
   </Text>
</View>
<View style={{ height: 50, borderColor: '#B3B6B720', borderTopWidth: 1, borderBottomWidth: 1, justifyContent: 'center'}}>
    <Text style={{ fontSize: 16, fontWeight: '600', alignSelf: 'center'}}> Attend Event? </Text>
</View>
 <ButtonStack handlePress={handlePress} members={data.members.map(item => item.id)} id={user.id} />
  </View>
)

const ButtonStack = ({ handlePress, id, members }) => (
  <View style={{ width, height: height * 0.18, flexDirection: 'row', flexWrap: 'nowrap', alignItems: 'center', justifyContent: 'space-around'}}>
  {
    !members.includes(id) ? 
    <TouchableOpacity style={{ ...bigButton, width: 90, }} onPress={() => { handlePress('yes')}}>
      <Text style={{ ...buttonText}}> YES </Text>
    </TouchableOpacity>
    : null
  }{

    <TouchableOpacity style={{ ...bigButton, width: 90, backgroundColor: '#E74C3C'}} onPress={() => { if(members.includes(id)) return handlePress('',2); handlePress()}}>
    <Text style={{ ...buttonText}}> {members.includes(id) ? 'CANCEL' : 'NO'} </Text>
  </TouchableOpacity>
  }
   
  </View>
)

ShowEvent.navigatorStyle = {
  tabBarHidden: true
}

const mapStateToProps = state => ({
  target: state.events.target,
  user: state.users.current
})

export default connect(mapStateToProps)(ShowEvent)
