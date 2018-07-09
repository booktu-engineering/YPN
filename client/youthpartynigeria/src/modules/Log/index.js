import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { height, width } from '../../mixins/';
import { formatDate } from '../../helpers/uploader';

const MessageLog = ({ data, origin }) => (
  <FlatList
    data={data}
    renderItem={({ item }) => <MessageComponent origin={origin} data={item} />}
    style={{
      flex: 1,
      paddingRight: 10,
      paddingLeft: 10,
      paddingTop: 15,
    }}
    initialScrollIndex={(data.length - 6)}
  />
);

const MessageComponent = ({ data, origin }) => (
  <View
    style={{
      minHeight: height * 0.07,
      minWidth: width * 0.8,
      backgroundColor: (data.origin._id === origin._id ? '#D5F5E3' : '#E8F8F5'),
      alignSelf: (data.origin._id === origin._id ? 'flex-end' : 'flex-start'),
      paddingTop: 5,
      borderRadius: 5,
      paddingRight: 10,
      paddingLeft: 10,
      paddingBottom: 15,
      marginBottom: 20,
      justifyContent: 'space-around'
     }}
  >
    <View style={{
 height: 15, maxWidth: width * 0.8, flexDirection: 'row', flexWrap: 'nowrap', marginBottom: 5, justifyContent: 'space-between'
}}
    >
      <Text style={{ fontSize: 13, fontWeight: '500', color: '#B3B6B7', }}> { `${data.origin.firstname} ${data.origin.lastname}` }</Text>
      <Text style={{ fontSize: 13, fontWeight: '500', color: '#B3B6B7', }}> { formatDate(data.createdAt) }</Text>
    </View>
    <Text style={{
 fontSize: 13, color: '#797D7F', fontWeight: '500', maxWidth: width * 0.7, textAlign: 'left'
}}
    > { data.content }
    </Text>
  </View>
);

export default MessageLog;
