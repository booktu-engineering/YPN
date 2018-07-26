import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import moment from 'moment';
import { connect } from 'react-redux';
import { dispatchNotification } from '../../helpers/uploader';
import { attendEvent } from '../../actions/thunks/events';
import { height, width, bigButton, buttonText } from '../../mixins';

const uri = 'https://socialmediaweek.org/london/files/2017/09/71A6202.jpg';

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

  handlePress = (a) => {
    if (a) return this.props.dispatch(attendEvent(this.props.target._id)(this.props.navigator))
    dispatchNotification(this.props.navigator)('Okay. Got it.')
    this.props.navigator.pop(); 
  } 
 
render = () => <RenderEvent data={this.props.target} handlePress={this.handlePress}/>
}

const RenderEvent = ({ data, handlePress }) => (
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
 <ButtonStack handlePress={handlePress} />
  </View>
)

const ButtonStack = ({ handlePress }) => (
  <View style={{ width, height: height * 0.18, flexDirection: 'row', flexWrap: 'nowrap', alignItems: 'center', justifyContent: 'space-around'}}>
    <TouchableOpacity style={{ ...bigButton, width: 90, }} onPress={() => { handlePress('yes')}}>
      <Text style={{ ...buttonText}}> YES </Text>
    </TouchableOpacity>
    <TouchableOpacity style={{ ...bigButton, width: 90, backgroundColor: '#F4D03F'}} onPress={() => { handlePress()}}>
      <Text style={{ ...buttonText}}> NO </Text>
    </TouchableOpacity>
    <TouchableOpacity style={{ ...bigButton, width: 90, backgroundColor: '#E74C3C'}} onPress={() => { handlePress()}}>
      <Text style={{ ...buttonText}}> MAYBE </Text>
    </TouchableOpacity>
  </View>
)

ShowEvent.navigatorStyle = {
  tabBarHidden: true
}

const mapStateToProps = state => ({
  target: state.events.target
})

export default connect(mapStateToProps)(ShowEvent)
