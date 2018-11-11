import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView
} from 'react-native';
import { replyToPost, fetchTimeline } from '../../actions/thunks/posts';
import { height, width } from '../../mixins';


const placeholder = 'https://ht-cdn.couchsurfing.com/assets/profile-picture-placeholder.png';
class AddCommentContainer extends Component {
    handleSubmit = () => {
      if (!this.state.content || !this.state.content.length) return;
      this.props.navigator.dismissLightBox({});
      const data = {
        type: 1, content: this.state.content, referenceObject: this.props.target, referenceID: this.props.target._id
      };
      this.props.dispatch(replyToPost(data, this.props.callback)(this.props.navigator));
    }

    componentWillUnmount = () => {
      this.props.navigator.dismissLightBox({});
      this.props.dispatch(fetchTimeline(this.props.navigator));
    }

    render = () => (
        <TouchableOpacity
          style={{
            height,
            width,
            backgroundColor: '#0A0A0A80',
          }}
          onPress={() => { this.props.navigator.dismissLightBox({}); }}
        >
           <KeyboardAvoidingView enabled behavior="padding" style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{
                      backgroundColor: '#fff',
                      width: '90%',
                      height: '50%',
                      padding: 10,
                      borderRadius: 4
                    }}
                    >
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 14 }}>
                        {`Replying to ${this.props.target.origin.firstname}`}
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                           <Image source={{ uri: this.props.target.origin.avatar || placeholder }} style={{ width: 50, height: 50, borderRadius: 25 }} />
                           <Text style={{ marginHorizontal: 10, fontWeight: '500', fontSize: 13 }}>
{this.props.target.origin.firstname}
</Text>
                        </View>
                        <TextInput
                          textAlignVertical="top"
                          multiline
                          maxLength={350}
                          style={{ height: '60%', marginVertical: 10 }}
                          placeholderTextColor="#a6a6a6"
                          onChangeText={content => this.setState({ content })}
                          placeholder="Type your comment"
                        />
                        <TouchableOpacity
                          onPress={this.handleSubmit}
                          style={{
                            backgroundColor: '#82BE30', width: '20%', paddingVertical: 10, paddingHorizontal: 5, alignSelf: 'flex-end', borderRadius: 4
                          }}
                        >
                            <Text style={{ color: '#fff', textAlign: 'center' }}>
Post
</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
        </TouchableOpacity>
    )
}

AddCommentContainer.navigatorStyle = {
  navBarHidden: true,
  tabBarHidden: true
};

export default connect()(AddCommentContainer);
