import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { height, width, bigButton, buttonText } from '../../mixins';


const RenderDetailsOfYPN = () => (
  <View style={{
    height: 30,
    width,
    alignItems: 'center',
    justifyContent: 'center'
  }}>
      <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#797D7F'}}>Youth Party</Text>
      <Text style={{ fontSize: 13, fontWeight: '500', color: '#979A9A'}}> hello@youthpartyng.com</Text>
      <Text style={{ fontSize: 13, fontWeight: '500', color: '#979A9A'}}> No 6 Bamako Crescent, Wuse Zone 1, Abuja, Nigeria</Text>
    </View>
);

const RenderPhoneTing = () => (
    <View
        style={{
          width: width * 0.9,
          height: height * 0.12,
          borderRadius: 3,
          backgroundColor: 'white',
          paddingLeft: 10, 
          paddingTop: 10,
          borderColor: '#D7DBDD',
          borderWidth: 0.3
        }}
    > 
        <Text style={{ 
          fontWeight: '700', 
          fontSize: 14, 
          marginBottom: 5,
          color: '#424949' }}> Phone</Text>
            <Text style={{ fontSize: 13, color: '#B3B6B7' }}> 08154859527 </Text>
    </View>
)

const RenderSubmitButton = ({ value, handleChange, handleSubmit }) => (
    <View style={{ width, height: height * 0.3 }}> 
          <TextInput
            style={{
               width: width * 0.9,
               height: height * 0.22,
               color: '#979A9A',
               fontSize: 13,
               borderColor: '#D7DBDD',
               borderWidth: 0.3,
               fontWeight: '500',
               backgroundColor: 'white',
               marginBottom: 15,
               paddingLeft: 15,
               paddingRight: 10
            }}
            placeholder="Send us a message"
            multiline={true}
            onChangeText={(text) => { handleChange(text, 'content')}}
            value={value}
         />

         <TouchableOpacity style={{ ...bigButton, position: 'relative', left: -5 }} onPress={handleSubmit}>
                <Text style={{ ...buttonText }}> Send</Text>
         </TouchableOpacity>
    </View>
)

const IconDirectory = (navigator) => {
    const directory = [{
        name: "instagram-with-circle",
        func: () => navigator.push({ screen: "Web.Page", passProps: { source: "https://instagram.com/youthparty_nigeria" }})
    },
    {
        name: "facebook-with-circle",
        func: () => navigator.push({ screen: "Web.Page", passProps: { source: "https://facebook.com/YouthPartyNG" }})
    },
    {
        name: "twitter-with-circle",
        func: () => navigator.push({ screen: "Web.Page", passProps: { source: "https://twitter.com/youthparty_ng" }})
    },
    {
        name: "google--with-circle",
        func: () => navigator.push({ screen: "Web.Page", passProps: { source: "https://plus.google.com/" }})
    }
]
const items = () => directory.map(obj =><TouchableOpacity style={{ marginRight: 10 }}onPress={obj.func}><Entypo name={obj.name} color="#797D7F" size={20}  /></TouchableOpacity>)
    return (
        <View style={{
            height: 60,
            width,
            flexDirection: 'row',
            justifyContent: 'center'
        }}>{items()}</View>
    )
}

export {
    IconDirectory,
    RenderPhoneTing,
    RenderDetailsOfYPN,
    RenderSubmitButton
}