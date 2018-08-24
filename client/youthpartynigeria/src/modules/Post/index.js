import React, { Component } from 'react'
import { connect } from 'react-redux';
import { View, Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native'
import { defaultGreen, height, width, bigButton, buttonText   } from '../../mixins/'
import styles from './styles';
import { sendPost } from '../../actions/thunks/posts';
import { MultipleUpload, SendToCloudinary, dispatchNotification, StartProcess, EndProcess } from '../../helpers/uploader';
import { CameraIcon } from '../IconRegistry/'


let nav;
const uri = 'https://res.cloudinary.com/dy8dbnmec/image/upload/v1535072474/logo.png';

 class PostContainer extends Component {
   constructor(props) {
     super(props)
     this.props.navigator.setButtons({
      leftButtons: [
        {
          id: 'showNav',
          component: 'Left.Button', 
          passProps: {
              navigator: this.props.navigator
          }
        }
      ]
    })
   }
   state = { type: 1, links: '',}

   componentDidMount = () => {
    const { navigator } = this.props
    navigator.toggleTabs({ to: 'shown', animated: true });
    navigator.setDrawerEnabled({ side: 'left', enabled: true });
   }

   handleMediaUpload = () => {
     MultipleUpload()
     .then(images => {
       this.setState({ images });
     })
   }

   


   handleChange = (value, name) => this.setState({ [name]: value })

   __handleSubmit = () => {
     // format the links
     const links = this.state.links.split(', ')
     if(!this.state.content) return dispatchNotification(this.props.navigator)('Please fill the text box with content')
     this.props.dispatch(sendPost({ ...this.state, links})(this.props.navigator));
     this.state.images = false;
     this.state.media = false;
     this.setState({ content: '', links: '', images: false, media: false });
   }

   handleSubmit = () => {
    // means the user did not upload anything
    if(!this.state.images || !this.state.images.length) return this.__handleSubmit()
     // You want to make sure the images are sent to cloudiary first
     StartProcess(this.props.navigator)
     dispatchNotification(this.props.navigator)("Processing Images");
     Promise.all([SendToCloudinary(this.state.images, 'multiple')])
     .then((media) => {
       this.setState({ media })
       this.__handleSubmit()
       dispatchNotification(this.props.navigator)('Media successfully processed, uploading post now');
     })
     .catch((err) => {
       dispatchNotification(navigator)('Something went wrong uploading the media. Please try again.')
       console.log(err)
     })

   }

   render = () => <PostComponent
   user={this.props.user}
   handleMediaUpload={this.handleMediaUpload}
   handleSubmit={this.handleSubmit}
    handleChange={this.handleChange}
    value={this.state.content}
    />
 }


const PostComponent = ({ navigator, handleMediaUpload, handleChange, user, handleSubmit, value }) => {
  nav = navigator
  return (
    <ScrollView keyboardDismissMode="on-drag" style={{ flex: 1, backgroundColor: '#F4F6F7', paddingLeft: 25, paddingTop: 20 }}>
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
    { /* View containing Image and name */}
      <View style={{ flexDirection: 'row', height: height * 0.08, width: width * 0.35, marginBottom: 15 }}>
        <Image source={{ uri: user.avatar || uri }} style={{ height: 52, width: 52, borderRadius: 26, marginRight: 5 }}/>
        <Text style={{ fontSize: 14, fontWeight: '500', alignSelf: 'center', color: '#404040' }}> {`${user.firstname} ${user.lastname}`} </Text>
    </View>
    { /* render the large input  */}
    <View style={styles.base}>
      <TextInput
        style={styles.largeInput}
        placeholder="Share a post. What do you have to contribute?"
        multiline={true}
        onChangeText={(text) => { handleChange(text, 'content')}}
        value={value}
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
    </KeyboardAvoidingView>
    </ScrollView>
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
