import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Screen from '../../hocs/renderScreens';
import { dispatchNotification, StartProcess, EndProcess } from '../../helpers/uploader';
import { defaultGreen, height, width, bigButton, buttonText } from '../../mixins';
import styles from '../SignUp/styles';


class Subscription extends React.Component {
    handleNavigation = () => {
      if (!this.state.email || !this.state.name || !this.state.email.length || !this.state.email.length) return dispatchNotification(this.props.navigator)('Sorry you need to fill in all the fields');
      StartProcess(this.props.navigator);
      let authenticationString = btoa('youthparty:b0581a8215d7c08b6d44b8fd77efbe32-us17');
      authenticationString = 'Basic ' + authenticationString;
      fetch('https://us17.api.mailchimp.com/3.0/lists/cffa00240d/members', {
        mode: 'no-cors',
        method: 'POST',
        headers: {
          authorization: authenticationString,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email_address: this.state.email, 
          status: 'subscribed',
          merge_fields: {
            FNAME: this.state.name
          }
        })
      }).then((res) => {
        EndProcess(this.props.navigator);
        if(res.status == 400) return dispatchNotification(this.props.navigator)('Sorry, looks like you subscribed already');
        dispatchNotification(this.props.navigator)('Thank you for subscribing');
        this.props.navigator.pop();
        
      })
        .catch((err) =>  {
          EndProcess(navigator)
          dispatchNotification(this.props.navigator)('Something went wrong, sadly')
          this.props.navigator.pop();
        });
    }

    handleChange = (text, name) => this.setState({ [name]: text });

    render = () => (
        <View style={{ flex: 1, paddingTop: 60, paddingLeft: 50 }}>
           <View style={styles.formContainer}>
        <Text style={styles.formLabel}> EMAIL </Text>
        <TextInput style={styles.inputStyle}
          onChangeText={text => this.handleChange(text, 'email')}
          />
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.formLabel}> NAME </Text>
        <TextInput style={styles.inputStyle}
          onChangeText={text => this.handleChange(text, 'name')}
          />
      </View>
        <TouchableOpacity
          style={{ ...bigButton, position: 'relative', left: -43 }}
          onPress={() => { this.handleNavigation();}}
          >
          <Text style={{ ...buttonText }}>Subscribe </Text>
        </TouchableOpacity>
      </View>
    )
}

export default Screen(Subscription)({});
