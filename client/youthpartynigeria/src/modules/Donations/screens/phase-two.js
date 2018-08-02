import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { height, width, defaultGreen, bigButton, buttonText } from '../../../mixins/';
import { fetchDonation } from '../../../actions/thunks/donations';

class DonationPhaseTwo extends Component {
  constructor(props) {
    super(props, 'DPT.Back.Button');
    this.props.navigator.setButtons({
      leftButtons: [
        {
          id: 'back.button.t', 
          component: 'Back.Button', 
          passProps: {
            navigator: this.props.navigator
          }
        }
      ]
    });
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.state.data = this.props
  }

  state = {}

  onNavigatorEvent = (e) => {
    if (e.id === 'didAppear') {
      this.props.dispatch(fetchDonation(this.props._id)({}, {}))
        .then((response) => {
          this.setState({ data: response });
        });
    }
  }
  handleChange = (text) => this.setState({ amount: text })

   __renderMoney = (target) => target.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

  handleSubmit = () => {
    this.props.navigator.push({ screen: 'Pay.Component', title: `${this.props.title}`, passProps: { 
      destination: this.props._id, 
      amount: this.state.amount
    }})
  }

  render = () => <DonationPhaseTwoComponent data={this.state.data} renderMoney={this.__renderMoney} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
}

const DonationPhaseTwoComponent = ({ data, navigator, handleChange, handleSubmit, renderMoney }) => (
  <KeyboardAvoidingView style={{
    height: height * 0.9, 
    width,
    backgroundColor: '#F4F6F6'
  }}
    behavior="position"
    enabled
  >
  <View
  style={{
    height: height * 0.9, 
    width,
    justifyContent: 'space-around', 
    backgroundColor: '#F4F6F6', 
    paddingLeft: width * 0.11,
    paddingBottom: 20
  }}
  > 
  <AnimatedComponent data={data}/>
  <View style={{ height: 50, width, paddingRight: 50, position: 'relative', bottom: -10 }}>
    <View style={{
      height: 20,
      width,
      flexDirection: 'row',
      marginBottom: 10
    }}>
      <View style={{ height: 10, width: 10, backgroundColor: defaultGreen, marginRight: 10}}/>
      <Text style={{ fontSize: 15, position: 'relative', top: -5 }}>Amount: <Text style={{ textDecorationLine: 'line-through'}}>N</Text>{renderMoney(data.amount)}</Text>
      </View>
  <View style={{
    height: 20, 
    width, 
    flexDirection: 'row'
  }}>
      <View style={{ height: 12, width: 12, backgroundColor: '#F4D03F', marginRight: 10}}/>
      <Text style={{ fontSize: 15, position: 'relative', top: -5 }}>Target: <Text style={{ textDecorationLine: 'line-through' }}>N</Text>{renderMoney(data.target)}</Text>
  </View>
  </View>
    <View style={{ height: height * 0.1, width }}>
      <View style={{minHeight: height * 0.09, width, flexDirection: 'row', flexWrap: 'nowrap', paddingLeft: width * 0.02}}>
        <View style={{ height: height * 0.06, width: width * 0.12, backgroundColor: defaultGreen, justifyContent: 'center', paddingRight: 3, marginBottom: 25, alignItems: 'center', borderLeftRadius: 5}}> 
        <Text style={{fontSize: 19, textAlign: 'center', fontWeight: '700', color: 'white'}}>N</Text>
        </View>
        <TextInput onChangeText={handleChange} style={{ height: height * 0.06, width: width * 0.65, backgroundColor: 'white', color: '#B3B6B7', fontSize: 13, marginLeft: -5, fontWeight: '500', paddingLeft: 20, borderWidth: 0.65, borderColor: '#38393950', borderRadius: 2}}/>
      </View>
    </View>
    { /* Render the target */}
    <View style={{ height: height * 0.14, position: 'relative', top: -10,  width, marginBottom: 5 }}>
      {/* <Text style={{ fontSize: 16, marginBottom: 15, color: '#383939', fontWeight: '600'}}>{ data.category }</Text> */}
      <Target data={data} />
    </View>
    { /* The button at the end */}
    </View>
    <TouchableOpacity  onPress={() => { handleSubmit() }} style={{ ...bigButton, position: 'absolute', bottom: 40 }}>
      <Text style={{ ...buttonText }}>CONFIRM</Text>
    </TouchableOpacity>
  </KeyboardAvoidingView>
);

const Target = ({ data }) => (
  <View style={{ height: height * 0.18, width, flexDirection: 'row', flexWrap: 'nowrap'}}>
    <Image style={{ height: 40, width: 40, borderRadius: 20, marginRight: 10}} source={{ uri: '' }}/>
    <View style={{ height: height * 0.15, maxWidth: width * 0.5 }}>
      <Text style={{ fontSize: 15, fontWeight: '600', color: '#373838', marginBottom: 5}}> Description </Text>
      <Text style={{ fontSize: 14, fontWeight: '600', color: defaultGreen, marginBottom: 5, width }}>{data.description}</Text>
        {/* <Text style={{ fontWeight: '500', fontSize: 12, color: '#B3B6B7' }}>{ data.description }</Text> */}
      
    </View>
  </View>
);

const AnimatedComponent = ({ data }) => {
  const fill = Math.round((data.amount / data.target) * 100)
  return (
    <View style={{ height: height * 0.13, width, marginBottom: 23, alignItems: 'center',  paddingRight: 60 }}>
      <AnimatedCircularProgress
        size={140}
        width={10}
        fill={fill}
        tintColor="#82BE30"
        backgroundColor="#F0BA00">
        {
          (fill) => (
        <Text style={{ fontSize: 25, color: '#82BE30'}}>{ `${Math.ceil(fill)}%` }</Text>
          )}
        </AnimatedCircularProgress>
    </View>
  )
}


export default connect()(DonationPhaseTwo);
