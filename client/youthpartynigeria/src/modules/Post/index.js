import React, { Component } from 'react'
import { Navigation } from 'react-native-navigation'
import { View, Text, Image, TextInput } from 'react-native'
import { defaultGreen, height, width, bigButton, buttonText   } from '../../mixins/'
import styles from './styles';
import { CameraIcon } from '../IconRegistry/'
// import { withNavigation, BackIcon } from '../IconRegistry/'

let nav;
const uri = 'https://menhairstylist.com/wp-content/uploads/2017/07/dreads-in-man-bun-black-men-hairstyles.jpg'
const PostComponent = ({ navigator }) => {
  nav = navigator
  return (
    <View style={{ flex: 1, backgroundColor: '#F4F6F7', paddingLeft: 25, paddingTop: 20 }}>
      { /* View containing Image and name */}
      <View style={{ flexDirection: 'row', height: height * 0.08, width: width * 0.35, marginBottom: 15 }}>
        <Image source={{ uri }} style={{ height: 52, width: 52, borderRadius: 26, marginRight: 5 }}/>
        <Text style={{ fontSize: 14, fontWeight: '500', alignSelf: 'center', color: '#404040' }}> John Doe </Text>
    </View>
    { /* render the large input  */}
    <View style={styles.base}>
      <TextInput
        style={styles.largeInput}
        placeholder="Share a post. What do you have to contribute?"
        multiline={true}
        />
      { /* render the Add media button */}
      <View style={styles.ImageUploader}>
        <Text style={{ fontSize: 12, color: defaultGreen, fontWeight: '500' }}> Add Media </Text>
        <CameraIcon style={{ position: 'relative', top: -5 }} size={24} color={`${defaultGreen}`}/>
      </View>
    </View>
     { /* render the share link */}
     <View style={styles.base2}>
       <TextInput style={styles.smallInput} multiline={true} placeholder="Share a link"/>
     </View>
     { /* render the bigbutton */}
     <View style={{ ...bigButton, width: width * 0.8, position: 'relative', left: -10 }}>
       <Text style={{ ...buttonText }}> POST </Text>
     </View>
    </View>
  );
}

PostComponent.navigatorStyle = {
  navBarBackgroundColor: defaultGreen,
  navBarTextColor: '#ffffff',
  statusBarTextColorScheme: 'light'
}

PostComponent.navigatorButtons = {
  leftButtons: [
    {
      id: 'ShowNav',
      component: 'Left.Button'
    }

  ]
}
export const PostNavigator = () => nav;
export default PostComponent
