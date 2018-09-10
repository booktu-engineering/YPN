import React from 'react'; 
import { View, Text, TouchableOpacity } from 'react-native';
import { height, width, defaultGreen } from '../../../mixins';
import { setAsTarget } from '../../../actions/thunks/polls'

export default ({ navigator, data, dispatch }) => {
    const items = () =>  data.map((election) => {
        return (
            <TouchableOpacity style={{
                height: height * 0.13, paddingLeft: 15, paddingRight: 15, justifyContent: 'center', borderColor: '#B3B6B750', position: 'relative', borderBottomWidth: 0.3
              }}
              onPress={() => { dispatch(setAsTarget(navigator)(election))}}
              >
                <Text style={{
                  fontSize: 15, fontWeight: '600', color: '#626567', marginBottom: 10
                }}
                >
        {election.title}
                </Text>
                <Text style={{ fontSize: 13, fontWeight: '500', color: '#B3B6B7' }}>
        { election.meta.location ? election.meta.location : 'Federal' }
                </Text>
              </TouchableOpacity>
        )        
    });
    return (
        <View style={{ flex: 1, paddingLeft: 20, paddingTop: 20 }}>
          <View style={{ height: 50, width: width * 0.9, alignItems: 'center' }}>
            <Text style={{ fontSize: 16, fontWeight: '500', color: '#626567' }}>
      Primary Elections
            </Text>
          </View>
          { items() }
        </View>
      );
} 