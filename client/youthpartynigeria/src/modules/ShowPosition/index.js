import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { ApplyForPosition } from '../../actions/thunks/candidates';
import { dispatchNotification } from '../../helpers/uploader';
import { followUserThunk } from '../../actions/thunks/user';
import { height, width, defaultGreen, bigButton, buttonText } from '../../mixins';

const uri = 'https://buzznigeria.com/wp-content/uploads/2013/09/Presidential-flag-Standard.png'
const personUri = 'https://menhairstylist.com/wp-content/uploads/2017/07/dreads-in-man-bun-black-men-hairstyles.jpg'
 
class ShowPosition extends Component {
  constructor(props) {
    super(props);
    const { navigator } =  this.props
    navigator.setDrawerEnabled({ side: 'left', enabled: false });
    navigator.setButtons({
      leftButtons: [
        {
          id: 'nacvxx', 
          component: 'Back.Button', 
          passProps: {
            navigator
          }
        }
      ]
    })
  }
  
  generateText = () => {
    if(!this.props.data.meta.responsibilities) return <Text style={{ fontSize: 13, fontWeight: '600', color: '#626567', marginBottom: 15,}}> None Specified </Text>
    return this.props.data.meta.responsibilities.map(item => <Text style={{ fontSize: 13, fontWeight: '600', color: '#626567', marginBottom: 15,}} > { item  }</Text>)
  }
  
render () {
  return (
    <View style={{ flex: 1}}>
    { this.props.candidate ? <RenderCandidate {...this.props}/> : <RenderPosition generateText={this.generateText} {...this.props} /> }
    </View>
  )
}
}

const RenderPosition = ({ data, generateText, dispatch, navigator }) => (
  <View style={{ flex: 1 }}>
    { /* the first part */}
    <View style={{ height: height * 0.3, width, alignItems: 'center', justifyContent: 'center', borderBottomColor: '#D0D3D420', borderBottomWidth: 1 }}>
      <Image style={{ height: 76, width: 76, borderRadius: 38, marginBottom: 15 }} source={{ uri }}/>
      <Text style={{ fontSize: 17, fontWeight: '600', color: '#191A1A', marginBottom: 10}}> {data.name } </Text>
      <Text style={{ fontSize: 13, fontWeight: '600', color: defaultGreen, marginBottom: 8}}> {data.meta.location || ''} </Text>
    </View>
    { /* you should have the text */}
    <View style={{ minHeight: height * 0.35, width, paddingLeft: 25, paddingTop: 25 }}>
      <View style={{ maxHeight: height*0.3, width, marginBottom: 35 }}>
       <Text style={{ fontSize: 15, fontWeight: '600', color: '#626567', marginBottom: 15,}}> Qualifications and Requirements </Text>
        { generateText() }     
      </View>
      { /* Application deadline */}
      <View style={{ maxHeight: height*0.3, width, marginBottom: 15 }}>
        <Text style={{ fontSize: 15, fontWeight: '600', color: '#626567', marginBottom: 15,}}> Application Deadline  </Text>
        <Text style={{ fontSize: 13, fontWeight: '500', color: '#979A9A', maxWidth: width * 0.8, marginBottom: 5 }}> {'4th June, 2018'}</Text>
      </View>
    </View>
    <TouchableOpacity style={{ ...bigButton, position: 'absolute', bottom: 10 }} onPress={() => { dispatch(ApplyForPosition(navigator)(data._id)) }}>
      <Text style={{ ...buttonText }}> APPLY </Text>
    </TouchableOpacity>
  </View>
)


const RenderCandidate = ({ data , dispatch, navigator }) => (
    <View style={{ flex: 1 }}>
      { /* first part */}
      <View style={{ height: height * 0.3, width, alignItems: 'center', justifyContent: 'center', borderBottomColor: '#D0D3D420', borderBottomWidth: 1 }}>
        <Image style={{ height: 76, width: 76, borderRadius: 38, marginBottom: 15 }} source={{ uri: personUri }}/>
        <Text style={{ fontSize: 17, fontWeight: '600', color: '#191A1A', marginBottom: 10}}>{data.position || 'House Of Rep'}</Text>
        <Text style={{ fontSize: 13, fontWeight: '600', color: defaultGreen, marginBottom: 8}}> {data.location || ''}</Text>
        <Text style={{ fontSize: 13, fontWeight: '600', color: '#D0D3D4', marginBottom: 8}}> Age: 42 </Text>
      </View>
      {  /* Candidate's bio */}
      <View style={{ minHeight: height * 0.35, width, paddingLeft: 25, paddingTop: 25 }}>
        <View style={{ maxHeight: height*0.3, width, marginBottom: 35 }}>
          <Text style={{ fontSize: 15, fontWeight: '600', color: '#626567', marginBottom: 15,}}> {`${data.firstname}'s Bio:`} </Text>
          <Text style={{ fontSize: 13, fontWeight: '500', color: '#979A9A', maxWidth: width * 0.9, marginBottom: 8 }}>
            { data.bio || 'None Specified'}
          </Text>
        </View>
      </View>
      <TouchableOpacity style={{ ...bigButton, position: 'absolute', bottom: 17 }}
        onPress={() => {
          if(!data.id) return dispatchNotification(navigator)(`${data.name} is not a user yet, Please check back`);
          return dispatch(followUserThunk(data)(navigator));
        }}
      >
        <Text style={{ ...buttonText }}> Follow </Text>
      </TouchableOpacity>
    </View>
)

ShowPosition.navigatorButtons = {
  leftButtons: [
    {
      id: 'SP.Back.Nav',
      component: 'Sp.Back.Button'
    }
  ]
};

ShowPosition.navigatorStyle = {
  tabBarHidden: true
}
export default connect()(ShowPosition);
