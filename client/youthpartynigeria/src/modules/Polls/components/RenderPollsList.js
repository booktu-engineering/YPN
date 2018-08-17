import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { height, width, defaultGreen } from '../../../mixins';
import { setAsTarget } from '../../../actions/thunks/polls';

export default ({ navigator, data, dispatch }) => {
  const items = () => data.map(election => (
    <TouchableOpacity style={{
      height: height * 0.13,
      width,
      paddingLeft: 25,
      paddingRight: 15,
      justifyContent: 'center',
      borderColor: '#B3B6B740',
      position: 'relative',
      borderBottomWidth: 0.1, 
      backgroundColor: '#F2F3F4'
    }}
    onPress={() => navigator.push({ screen: 'Show.Poll', title: `${data.title || 'Survey'}`, passProps: { data }})}
    >
      <Text style={{
        fontSize: 15,
        fontWeight: '600',
        color: '#626567',
        marginBottom: 10
      }}
      >
        {election.title && election.title}
      </Text>
      <Text style={{
        fontSize: 13,
        fontWeight: '500',
        color: '#B3B6B7'
      }}
      >
        { election.meta.location ? election.meta.location : 'Federal' }
      </Text>
    </TouchableOpacity>
  ));

  return (
    <View
      style={{
        flex: 1,
        paddingTop: 20
      }}
    >
      <View style={{
        height: 50,
        width: width * 0.9,
        alignItems: 'center'
      }}
      >
        <Text style={{
          fontSize: 16,
          fontWeight: '500',
          color: '#626567'
        }}
        >
        { 'Surveys & Polls'}
        </Text>
      </View>
      { items() }
    </View>
  );
};
