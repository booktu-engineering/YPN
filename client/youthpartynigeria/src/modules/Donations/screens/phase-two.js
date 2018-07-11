import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import Screen from '../../../mixins/screen';
import { height, width, defaultGreen, bigButton, buttonText } from '../../../mixins/';

class DonationPhaseTwo extends Screen {
  constructor(props) {
    super(props, 'DPT.Back.Button');
  }

  render = () => <DonationPhaseTwoComponent data={this.props} />
}

const DonationPhaseTwoComponent = ({ data }) => (
  <View style={{
 flex: 1, justifyContent: 'space-around', backgroundColor: '#F4F6F6', paddingLeft: width * 0.11
}}>
    { /* The Amount */}
    <View style={{ height: height * 0.12, width }}>
      <Text style={{
 fontSize: 18, fontWeight: '500', color: '#626567', marginBottom: 18, alignSelf: 'center', position: 'relative', right: width * 0.1
}}
      > Amount
      </Text>
      <View style={{
 minHeight: height * 0.09, width, flexDirection: 'row', flexWrap: 'nowrap', paddingLeft: width * 0.02
}}
      >
        <View style={{
 height: height * 0.06, width: width * 0.12, backgroundColor: defaultGreen, justifyContent: 'center', paddingRight: 3, marginBottom: 25, alignItems: 'center', borderLeftRadius: 5,
}}
        > <Text style={{
 fontSize: 19, textAlign: 'center', fontWeight: '700', color: 'white'
}}
        > N
        </Text>
        </View>
        <TextInput
          style={{
 height: height * 0.06, width: width * 0.65, backgroundColor: 'white', color: '#B3B6B7', fontSize: 13, marginLeft: -5, fontWeight: '500', paddingLeft: 20, borderWidth: 0.65, borderColor: '#38393950', borderRadius: 2
}}
        />
      </View>
    </View>
    { /* Render the target */}
    <View style={{ height: height * 0.2, width, marginBottom: 5 }}>
      <Text style={{
 fontSize: 16, marginBottom: 15, color: '#383939', fontWeight: '600'
}}
      > { data.category }
      </Text>
      <Target data={data} />
    </View>
    { /* The button at the end */}
    <TouchableOpacity style={{ ...bigButton, position: 'absolute', bottom: 70 }}>
      <Text style={{ ...buttonText }}> CONFIRM </Text>
    </TouchableOpacity>
  </View>
);

const Target = ({ data }) => (
  <View style={{
 height: height * 0.18, width, flexDirection: 'row', flexWrap: 'nowrap',
}}>
    <Image
      style={{
 height: 40, width: 40, borderRadius: 20, marginRight: 10
}}
      source={{ uri: '' }}
    />
    <View style={{ height: height * 0.15, maxWidth: width * 0.5 }}>
      <Text style={{
 fontSize: 14, fontWeight: '600', color: '#373838', marginBottom: 5
}}
      > { data.title }
      </Text>
      <Text style={{
 fontSize: 14, fontWeight: '600', color: defaultGreen, marginBottom: 5
}}
      > { data.role ? data.role : data.location }
      </Text>
      {
        data.role ? <Text style={{ fontWeight: '500', fontSize: 12, color: '#B3B6B7' }}> { data.location }</Text> : null
      }
    </View>
  </View>
);

DonationPhaseTwo.navigatorButtons = {
  leftButtons: [
    {
      id: 'D2.Button',
      component: 'DPT.Back.Button'
    }
  ]
};

export default DonationPhaseTwo;
