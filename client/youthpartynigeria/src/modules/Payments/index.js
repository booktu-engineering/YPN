import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { height, width, defaultGreen, bigButton, buttonText } from '../../mixins/';
import { dispatchNotification } from '../../helpers/uploader';

class MemberShipContainer extends Component {
    constructor (props) {
        super(props);
        this.props.navigator.setButtons({
            leftButtons: [
                {
                    id: 'Back.nav', 
                    component: 'Back.Button', 
                    passProps: {
                        navigator: this.props.navigator, 
                        modal: true
                    }
                }
            ], 
            rightButtons: [
                {
                    id: 'Back.nav', 
                    component: 'Search.Button', 
                    passProps: {
                        navigator: this.props.navigator, 
                        dispatch: this.props.dispatch
                    }
                }
            ]
        })
    }

    handlePress = () => {
        if(parseInt(this.props.user.role) > 0) {
            this.props.navigator.dismissModal({ animated: true });
           return  dispatchNotification(this.props.navigator)("You're already a party member, Subscribe next quarter!");
        }
        this.props.navigator.push({ screen: 'Pay.Component', title: 'Subscribe'})

    }
    render = () => {
        return (
        <View style={{ flex: 1, marginBottom: 15 }}> 
        <View style={{ height: height * 0.13, paddingTop: 10, width, backgroundColor: defaultGreen, marginBottom: 20 }}> 
            <Text style={{ fontSize: 14, color: 'white', fontWeight: '600', textAlign: 'center'}}> 
                Becoming a member gives you access to the hightlighted features.
            </Text>
        </View>
            <RenderCreditCard />
            <ListOfBenefits />
            <TouchableOpacity style={{ ...bigButton, position: 'absolute', bottom: 45 }} onPress={() => { this.handlePress()}}> 
                <Text style={{ ...buttonText }}> PAY MEMBERSHIP FEE </Text>
            </TouchableOpacity>
        </View>
        )
    }
}


const ListOfBenefits = () => (
    <View style={{ height: height * 0.15, width: width * 0.85, justifyContent: 'space-between', paddingLeft: 15 }}> 
        <Text style={{ fontSize: 13, color: '#424949', fontWeight: '500' }}> - Contribute to posts and comments</Text>
        <Text style={{ fontSize: 13, color: '#424949', fontWeight: '500' }}> - Participate in debates and townhall meetings</Text>
        <Text style={{ fontSize: 13, color: '#424949', fontWeight: '500' }}> - Participate in polls and elections</Text>
        <Text style={{ fontSize: 13, color: '#424949', fontWeight: '500' }}> - Real time active messaging with other members</Text>
    </View>
)
const RenderCreditCard = () => (
    <View style={{ height: height * 0.28, width: width * 0.85,  marginBottom: 32, justifyContent: 'space-around', paddingLeft: 20, alignSelf: 'center', backgroundColor: '#283747', borderRadius: 5 }}> 
    { /* this is the 600 part */}
    <View style={{ height: 60, width: 150 }}> 
        <Text style={{ fontSize: 17, fontWeight: '700', color: defaultGreen, marginBottom: 5 }}>N600</Text>
        <Text style={{ fontSize: 14, fontWeight:'500', color: 'white' }}>For 3 Months</Text>
    </View>
    <RenderDigits data={[1,2,3,4]} />
    </View>
);

const RenderSingleDigitSet = () => (
    <View style={{ width: 80, height: 25, flexDirection: 'row' }}>
      <View style={{ height: 8, width: 8, backgroundColor: 'white', borderRadius: 4, marginLeft: 2}}></View>
      <View style={{ height: 8, width: 8, backgroundColor: 'white', borderRadius: 4, marginLeft: 2}}></View>
      <View style={{ height: 8, width: 8, backgroundColor: 'white', borderRadius: 4, marginLeft: 2}}></View>
      <View style={{ height: 8, width: 8, backgroundColor: 'white', borderRadius: 4, marginLeft: 2}}></View>
    </View>
)

const RenderDigits = ({ data }) => {
    const items = () =>  data.map(item => <RenderSingleDigitSet />)
    return (
        <View style={{ height: 25, width: width * 0.75, flexDirection: 'row', justifyContent: 'space-between'}}> 
            { items() }
        </View>
    )
}

MemberShipContainer.navigatorStyle = {
    navBarBackgroundColor: defaultGreen,
    statusBarTextColorScheme: 'light',
    preferredContentSize: { height: 2000 }, 
    navBarNoBorder: true
  };

  const mapStateToProps = (state) => {
      return {
          user: state.users.current
      }
  }

  export default connect(mapStateToProps)(MemberShipContainer);