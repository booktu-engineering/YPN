import React from 'react';
import { View, Text, FlatList, ScrollView } from 'react-native';
import { height, width } from '../../mixins/';
import { formatDate } from '../../helpers/uploader';

const MessageLog = ({ data, origin, extraData }) => (
  <FlatList
    inverted
    data={data}
    renderItem={({ item }) => <MessageComponent origin={origin} data={item} />}
    style={{
      height: height * 0.78,
      width,
      paddingRight: 10,
      paddingLeft: 10,
      paddingTop: 15,
    }}
    getItemLayout={(item, index) => ({ index, height: height * 0.07, offset: 0 })}
    keyExtractor={(item, index) => item._id}
    extraData={extraData}
  />
);

//
// const MessageLog = ({ data, origin }) => {
//   const messages = data.map(data => <MessageComponent data={data} origin={origin} />);
//   return (
//     <ScrollView
//       style={{
//         flex: 1
//       }}
//     >
//       { messages }
//     </ScrollView>
//   );
// };


export const MessageComponent = ({ data, origin }) => (
  <View
    style={{
      minHeight: height * 0.07,
      minWidth: width * 0.8,
      backgroundColor: (data.origin.id === origin.id ? '#D5F5E3' : '#E8F8F5'),
      alignSelf: (data.origin.id === origin.id ? 'flex-end' : 'flex-start'),
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
