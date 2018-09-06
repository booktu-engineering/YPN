import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import RenderScreen from '../../hocs/renderScreens';
import { UpdateUserInfo } from '../../actions/thunks/user';
import { bigButton, buttonText, defaultGreen } from '../../mixins';
import { SingleUpload, dispatchNotification, StartProcess } from '../../helpers/uploader';
import styles from '../SignUp/styles';


class UpdateProfile extends React.Component {
   state = {};

    selectImage = () => {
      try {
        SingleUpload()
          .then((url) => {
            this.setState({ avatar: url });
          });
      } catch (e) {
        console.log(e);
      }
    }

    componentDidMount = () => {
      if(this.props.user.avatar) return this.setState({ avatar: this.props.user.avatar });
    }

    handleChange = (value, name) => this.setState({ [name]: value })

    handleSubmit = () => {
      if (this.props.passwordOnly && (!this.state.password || !this.state.password.length )) return dispatchNotification(this.props.navigator)('Please fill in the required fields');
      // loop through the state
      const values = Object.values(this.state).filter(item => !item.length);
      if (values.length) return dispatchNotification(this.props.navigator)('Please fill in the required fields');
      StartProcess(this.props.navigator);
      this.props.dispatch(UpdateUserInfo(this.state)(this.props.navigator));
    }

    render = () => {
      if(this.props.passwordOnly) return ( <PasswordForm handleChange={this.handleChange} handleSubmit={this.handleSubmit} />);

      return (
        <ScrollView keyboardShouldPersistTaps="never" style={{ flex: 1 }}>
        {/* This should contain the green bar and the image */}
        <View style={styles.greenBar}>
          <View style={styles.ImageHolder}>
            <Image style={styles.Image} source={{ uri: this.state.avatar }} />
            <TouchableOpacity style={styles.textHolder} onPress={this.selectImage}>
              <Text style={styles.smallText}> Change Photo</Text>
            </TouchableOpacity>
          </View>
        </View>
        { /* end of the green bar */}
        <UpdateForm state={this.state} user={this.props.user} handleChange={this.handleChange} handleClick={this.handleClickLink}/>

        <TouchableOpacity
          style={{ ...bigButton }}
          onPress={this.handleSubmit}
          >
          <Text style={{ ...buttonText }}>UPDATE</Text>
        </TouchableOpacity>
      </ScrollView>
    )
    }
}

const PasswordForm = ({ handleChange, handleSubmit }) => (
  <View style={{ flex: 1, flexFlow: 'column', justifyContent: 'center', alignItems: 'center' }}> 
    <View style={styles.formContainer}>
  <Text style={styles.formLabel}> NEW PASSWORD </Text>
  <TextInput style={styles.inputStyle}
    onChangeText={text => handleChange(text, 'password')}
    secureTextEntry
    />
</View>
<TouchableOpacity
          style={{ ...bigButton }}
          onPress={handleSubmit}
          >
          <Text style={{ ...buttonText }}>Change</Text>
        </TouchableOpacity>
  </View>

)

const UpdateForm = ({ handleChange, state, user }) => (
    <View style={styles.formHolder}>
      <View style={styles.formContainer}>
        <Text style={styles.formLabel}> FIRSTNAME </Text>
        <TextInput style={styles.inputStyle}
          onChangeText={text => handleChange(text, 'firstname')}
          defaultValue={user.firstname}
          />
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.formLabel}> LASTNAME </Text>
        <TextInput style={styles.inputStyle}
          onChangeText={text => handleChange(text, 'lastname')}
          defaultValue={user.lastname || ''}
          />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.formLabel}> BIO </Text>
        <TextInput style={styles.inputStyle}
          onChangeText={text => handleChange(text, 'bio')}
          defaultValue={user.bio || ''}
          multiline
          />
      </View>
    </View>
);

const mapStateToProps = (state) => ({
  user: state.users.current
})

export default connect(mapStateToProps)(RenderScreen(UpdateProfile)({}, { paddingTop: 0 }));