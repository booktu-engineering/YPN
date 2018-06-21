import React, { Component } from 'react'
import { Navigation } from 'react-native'
import { View, Text, Image } from 'react-native'
import { width, height, defaultGreen, avatar, LightGrey } from '../../mixins/'
let nav
const uri = 'https://78.media.tumblr.com/e3be90da5148607314ddb57928944f10/tumblr_o1bnpbIaVv1urlkdao1_1280.jpg';
const ChatComponent = ({ navigator }) => {
  nav = navigator;
  return (
     <View style={{ flex: 1 }}>
       <SingleChatComponent />
        <SingleChatComponent />
     </View>
    )
}


// remember to refactor this component
const SingleChatComponent = () => (
  <View style={{ height: height / 7, flexDirection: 'row', flexWrap: 'nowrap', paddingLeft: 15, borderBottomWidth: 1, borderBottomColor: '#D0D3D430', paddingTop: 10 }}>
    <Image source={{ uri }} style={{ ...avatar, marginRight: 10 }}/>
    <View style={{ width: width * 0.8, position: 'relative'}}>
      <Text style={{ fontSize: 14.5, fontWeight: '600'}}> Ijeoma Nduka </Text>
      <Text style={{ alignSelf: 'flex-end', fontSize: 11, fontWeight: '600', color: LightGrey, position:'absolute', top: 0, right: 15 }}> 20 Mins</Text>
      <Text style={{ fontSize: 12.5, fontWeight: '500', width: width * 0.76, color: '#979A9A', marginTop: 5 }}> Every person has a right to life, and no one shall be deprived intentionally of his life, save in...</Text>
    </View>
</View>
)
ChatComponent.navigatorStyle = {
  navBarBackgroundColor: defaultGreen,
  statusBarTextColorScheme: 'light'
}

ChatComponent.navigatorButtons = {
  leftButtons: [
    {
      id: 'showNav',
      component: 'Left.Button'
    }
  ]
}
export const ChatNavigator = () => nav
export default ChatComponent
