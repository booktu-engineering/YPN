import React, { Component } from 'react'
import { connect } from 'react-redux';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import { defaultGreen, height, width, bigButton, buttonText   } from '../../mixins/'
import styles from './styles';
import { sendPost } from '../../actions/thunks/posts';
import { MultipleUpload, SendToCloudinary, dispatchNotification } from '../../helpers/uploader';
import { CameraIcon } from '../IconRegistry/'
// import { withNavigation, BackIcon } from '../IconRegistry/'
'https://medium.com/s/story/sleep-your-way-to-the-top-debf3fd215c6'
let nav;
const uri = 'https://menhairstylist.com/wp-content/uploads/2017/07/dreads-in-man-bun-black-men-hairstyles.jpg'

 class PostContainer extends Component {
   state = { type: 1, links: '',}

   handleMediaUpload = () => {
     MultipleUpload()
     .then(images => {
       this.setState({ images })
     })
   }

   handleChange = (value, name) => this.setState({ [name]: value })

   __handleSubmit = () => {
     // format the links
     const links = this.state.links.split(', ')
     if(!this.state.content) return dispatchNotification(this.props.navigator)('Hey, you have to share something really')
     this.props.dispatch(sendPost({ ...this.state, links})(this.props.navigator))
   }

   handleSubmit = () => {
    // means the user did not upload anything
    if(!this.state.images || !this.state.images.length) return this.__handleSubmit()
     // You want to make sure the images are sent to cloudiary first
     dispatchNotification(this.props.navigator)("Processing your images, give me a second")
     Promise.all([SendToCloudinary(this.state.images, 'multiple')])
     .then((media) => {
       dispatchNotification(this.props.navigator)('Media successfully processed, uploading post now')
       this.setState({ media })
       this.__handleSubmit()
     })
     .catch((err) => {
       dispatchNotification(navigator)('Something went wrong uploading those photos. Please try again.')
       console.log(err)
     })

   }

   render = () => <PostComponent
   user={this.props.user}
   handleMediaUpload={this.handleMediaUpload}
   handleSubmit={this.handleSubmit}
    handleChange={this.handleChange}
    />
 }


const PostComponent = ({ navigator, handleMediaUpload, handleChange, user, handleSubmit }) => {
  nav = navigator
  return (
    <View style={{ flex: 1, backgroundColor: '#F4F6F7', paddingLeft: 25, paddingTop: 20 }}>
      { /* View containing Image and name */}
      <View style={{ flexDirection: 'row', height: height * 0.08, width: width * 0.35, marginBottom: 15 }}>
        <Image source={{ uri }} style={{ height: 52, width: 52, borderRadius: 26, marginRight: 5 }}/>
        <Text style={{ fontSize: 14, fontWeight: '500', alignSelf: 'center', color: '#404040' }}> {`${user.firstname} ${user.lastname}`} </Text>
    </View>
    { /* render the large input  */}
    <View style={styles.base}>
      <TextInput
        style={styles.largeInput}
        placeholder="Share a post. What do you have to contribute?"
        multiline={true}
        onChangeText={(text) => { handleChange(text, 'content')}}
        />
      { /* render the Add media button */}
      <TouchableOpacity style={styles.ImageUploader} onPress={handleMediaUpload}>
        <Text style={{ fontSize: 12, color: defaultGreen, fontWeight: '500' }}> Add Media </Text>
        <CameraIcon style={{ position: 'relative', top: -5 }} size={24} color={`${defaultGreen}`}/>
      </TouchableOpacity>
    </View>
     { /* render the share link */}
     <View style={styles.base2}>
       <TextInput
         style={styles.smallInput}
         multiline={true}
         placeholder="Share some links, separate it each one with a comma"
         onChangeText={(text) => { handleChange(text, 'links')}}
         />
     </View>
     { /* render the bigbutton */}
     <TouchableOpacity style={{ ...bigButton, width: width * 0.8, position: 'relative', left: -10 }} onPress={handleSubmit}>
       <Text style={{ ...buttonText }}> POST </Text>
     </TouchableOpacity>
    </View>
  );
}

PostContainer.navigatorStyle = {
  navBarBackgroundColor: defaultGreen,
  navBarTextColor: '#ffffff',
  statusBarTextColorScheme: 'light'
}

PostContainer.navigatorButtons = {
  leftButtons: [
    {
      id: 'ShowNav',
      component: 'Left.Button'
    }

  ]
}

const mapStateToProps = (state) => {
  return {
    user: state.users.current
  }
}
// doing this for the more button
export const PostNavigator = () => nav;
export default connect(mapStateToProps)(PostContainer)
