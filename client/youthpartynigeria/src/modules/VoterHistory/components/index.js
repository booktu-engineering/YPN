import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { bigButton, buttonText, height, width } from '../../../mixins'; 


const NotVerifiedComponent = ({ handleChange, handlePress }) => (
    <View style={{flex: 1, marginVertical: '30%', paddingHorizontal: 20}}>
    <Text style={{textAlign: 'center', fontSize: 14, fontWeight: '500', color: '#303030' }}>
        You need to verify your Voter Identification Number to participate in party elections
    </Text>
    <TextInput 
        underlineColorAndroid="rgba(0,0,0,0)"
        textAlignVertical="top"
        style={{borderColor: '#ccc', borderWidth: 1, marginTop: '15%', height: 40, marginBottom: 20, paddingLeft: 10 }}
        placeholderTextColor="#a6a6a6" 
        onChangeText={handleChange}
        placeholder="Enter your VIN here"
    />
    <View style={{marginTop: '5%'}}>
        <TouchableOpacity style={{ ...bigButton, }}onPress={handlePress}>
            <Text style={{ ...buttonText }}>Verify</Text>
        </TouchableOpacity>
    </View>
</View>
)

const VerifiedComponent = ({ navigator }) => (
    <View style={{height, width, alignItems: 'center', justifyContent: 'center' }}>
    <Text style={{textAlign: 'center', fontSize: 16, fontWeight: '600', marginBottom: 50 }}>
        You are eligible to participate in party elections
    </Text>
    <View style={{ height: 80, width: 80, alignSelf: 'center', marginBottom: 40 }}>
        <Icon name="ios-checkmark-circle" style={{fontSize: 60, color: '#82BE30', alignSelf: 'center'}}/>
    </View>
    <TouchableOpacity style={{ ...bigButton }}onPress={() => navigator.dismissModal({})}>
            <Text style={{ ...buttonText }}>Go Back </Text>
        </TouchableOpacity>
</View>
)

export {
  VerifiedComponent,
  NotVerifiedComponent
};
