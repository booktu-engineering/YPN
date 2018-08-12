import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import moment from 'moment';
import { dispatchNotification, EndProcess } from '../../helpers/uploader';
import { connect } from 'react-redux';
import email from 'react-native-email';
import { ApplyForCareer } from '../../actions/thunks/careers';
import { height, width, defaultGreen, bigButton, buttonText } from '../../mixins'


const uri = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Coat_of_arms_of_Nigeria.svg/2000px-Coat_of_arms_of_Nigeria.svg.png'

class ShowCareer extends Component {
  constructor(props) {
    super(props)
    const { navigator } =  this.props
    navigator.toggleTabs({ to: 'hidden', animated: true });
    navigator.setDrawerEnabled({ side: 'left', enabled: false });
    navigator.setButtons({
      leftButtons: [
        {
          id: 'nacv',
          component: 'Back.Button',
          passProps: {
            navigator
          }
        }
      ]
    });
  }

  handleSendMail = () => {
    // this doesnt work now because it is a simulator, but should work on my phone
    const destination = ['technical@booktu.org', 'hasstrup.ezekiel@gmail.com']
    email(destination, {
      subject: `Career Application for ${this.props.user.firstname} ${this.props.user.lastname}`
    })
      .then(() => {
        dispatchNotification(this.props.navigator)(`Nicely done, we would reach out. Thank you.`);
        this.props.navigator.pop();
      })
      .catch(() => {
        dispatchNotification(this.props.navigator)(`Sorry ${this.props.user.firstname}, we couldnt send the mail, try again`);
        this.props.navigator.pop()
      })
  }

render = () => <RenderCareer {...this.props} callback={this.handleSendMail} />
}


const RenderCareer = ({ data, navigator, dispatch, callback }) => (
  <View style={{ flex: 1 }}>
    { /* show the first card */}
    <View style={{ height: height * 0.15, width,
      flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'space-between',
      alignItems: 'center', paddingLeft: 15, paddingRight: 15, paddingTop: 15,  borderColor: '#B3B6B730', borderTopWidth: 0.3, borderBottomWidth: 0.3 }}
        >
        <View style={{ height: height * 0.13, width: width * 0.3, flexDirection: 'row', flexWrap: 'nowrap',}}>
          <Image style={{ height: 60, width: 60, borderRadius: 30, marginRight: 10 }} source={{ uri: data.meta.image || uri }}/>
          <View style={{ height: height * 0.10, width: width * 0.34, justifyContent: 'center' }}>
            <Text style={{ fontSize: 15, fontWeight: '600', color: '#1B1C1C', marginBottom: 5}}>{data.origin || ''}</Text>
            <Text style={{ fontSize: 13, fontWeight: '600', color: defaultGreen, marginBottom: 5}}>{data.role || ''}</Text>
        </View>
      </View>
      <Text style={{ height: 16, fontSize: 12, fontWeight: '400', color: '#B3B6B7', alignSelf: 'flex-start', position: 'relative', bottom: -10}}> {data.meta.location || ''}</Text>
    </View>
    { /* The text part */}
    <View style={{ height: height * 0.9, width, marginBottom: 15, paddingLeft: 25, paddingTop: 30 }}>
      <View style={{ maxHeight: height*0.3, width, marginBottom: 15 }}>
        <Text style={{ fontSize: 14, fontWeight: '600', color: '#626567', marginBottom: 8,}}> Responsibilities </Text>
       { data.meta.responsibilities && data.meta.responsibilities.map(item  => <Text style={{ fontSize: 12, fontWeight: '500', color: '#979A9A', maxWidth: width * 0.8, marginBottom: 5 }}> - {item} </Text>) 
      }
    </View>
    { /* requirements  */}
    <View style={{ maxHeight: height*0.3, width, marginBottom: 15 }}>
    <Text style={{ fontSize: 14, fontWeight: '600', color: '#626567', marginBottom: 8,}}> Requirements and Skill </Text>
    {
      data.meta.requirements && data.meta.requirements.map(item  => <Text style={{ fontSize: 12, fontWeight: '500', color: '#979A9A', maxWidth: width * 0.8, marginBottom: 5 }}> - {item} </Text>)
    }

  </View>

  <View style={{ maxHeight: height*0.3, width, marginBottom: 15 }}>
    <Text style={{ fontSize: 14, fontWeight: '600', color: '#626567', marginBottom: 8,}}> Application Closing Date  </Text>
    <Text style={{ fontSize: 12, fontWeight: '500', color: '#979A9A', maxWidth: width * 0.8, marginBottom: 5  }}>{data.meta.closing_date && moment(data.meta.closing_date).format("MMM Do YY")}</Text>
    </View>

    <View style={{ maxHeight: height*0.3, width, marginBottom: 30 }}>
      <Text style={{ fontSize: 14, fontWeight: '600', color: '#626567', marginBottom: 8,}}> Resume  </Text>
      <Text style={{ fontSize: 12, fontWeight: '500', color: '#979A9A', maxWidth: width * 0.8, marginBottom: 5 }}> { 'Email your resume to technical@booktu.org'}</Text>
      </View>
        { /* remember to do the resume sending thing */}
        <TouchableOpacity style={{ ...bigButton}} onPress={() => { dispatch(ApplyForCareer(navigator)(data.id)(callback))}}>
          <Text style={{ ...buttonText }}> APPLY </Text>
        </TouchableOpacity>
    </View>
  </View>
)

const mapStateToProps = (state) => ({
  user: state.users.current
})
export default connect()(ShowCareer)
