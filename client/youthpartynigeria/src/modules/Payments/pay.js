import React, { Component } from 'react';
import RNPaystack from 'react-native-paystack';
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native'; 
import { CreditCardInput } from "react-native-credit-card-input";
import { dispatchNotification } from '../../helpers/uploader';
import { bigButton, buttonText } from '../../mixins/';
import { makeADonation } from '../../actions/thunks/donations';
import { newPartyMember } from '../../actions/thunks/user';
import  PayWithPaystack  from "../../actions/thunks/paystack";
class Pay extends Component {

    constructor(props){
        super(props)
        // this.props.navigator.toggleTabs({ to: 'hidden', animated: true })
        this.props.navigator.setButtons({
            leftButtons: [
                {
                    id: 'Left.nav', 
                    component: 'Back.Button',
                    passProps: {
                        navigator: this.props.navigator
                    }
                }
            ]
        })
    }

    state = {}; 

    handlePay = () => {
        if (!this.state.valid) return dispatchNotification(this.props.navigator)('Hey those card details are invalid, try again?');
        const cardParams = {
           card: { 
            number: '4084084084084081',
            expiry_month: this._generateMonth(),
            expiry_year: this._generateYear(),
            cvv: '408'
         },
            email: this.props.user.email, 
            amount: this.props.amount * 100 || 60000,
        }
        this.props.dispatch(PayWithPaystack(this.props.navigator)(cardParams))
        .then((reference) => {
            dispatchNotification(this.props.navigator)('Awesome, that went through smoothly!')
            this.setState({ reference });
            if (this.props.destination) return this.handleDonationNavigation();
            return this.handleNewMember();
        })
        .catch((err) => {
            console.log(err);
            return dispatchNotification(this.props.navigator)('Sorry, that didnt go through, try again?')
        })
    }

    handleNewMember = () => this.props.dispatch(newPartyMember(this.props.navigator));


    handleDonationNavigation = () => this.props.dispatch(makeADonation({ 
        referenceID: this.state.reference || '1234', 
        destination: this.props.destination,
        amount: parseInt(this.props.amount), 
        date: Date.now()
     })(this.props.navigator));

    _generateYear = () => {
        return `${this.state.values.expiry.split('')[3]}${this.state.values.expiry.split('')[4]}`
    }

    _generateMonth = () => {
        return `${this.state.values.expiry.split('')[0]}${this.state.values.expiry.split('')[1]}`
    }

    _handleChange = (form) => {
        this.setState({ ...form });
        console.log(form);
    }

    render = () => {

        return (
        <ScrollView keyboardDismissMode="on-drag" style={{ flex: 1, paddingTop: 15 }}> 
        <KeyboardAvoidingView style={{ flex: 1, justifyContent: 'space-around' }} behavior="padding" >
        <CreditCardInput
        onChange={this._handleChange}
        inputContainerStyle={{
            borderBottomColor: '#909497',
            borderBottomWidth: 1,
            marginBottom: 15
        }}
        labelStyle={{
            fontSize: 14, 
            color: '#424949', 
            fontWeight: '600'
        }}
        cardImageFront={require('./assets/card-front.png')}
        cardImageBack={require('./assets/card-back.png')}
        />
        <TouchableOpacity onPress={() => { this.handlePay() }} style={{ ...bigButton }}>
            <Text style={{ ...buttonText }}>Pay</Text>
        </TouchableOpacity>   
        </KeyboardAvoidingView>
        </ScrollView>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.users.current
    }
}

Pay.navigatorStyle = {
    tabBarHidden: true
}

export default connect(mapStateToProps)(Pay)