import React from 'react';
import { View, Text, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { height, width } from '../../mixins/';
import { formatDate } from '../../helpers/uploader';

const MessageLog = ({ data, origin, extraData, focus }) => (
  <FlatList
    inverted
    data={data}
    renderItem={({ item }) => <MessageComponent origin={origin} data={item} focus={focus} />}
    style={{
      height: height * 0.78,
      width,
      paddingRight: 10,
      paddingLeft: 10,
      paddingTop: 15,
    }}
    getItemLayout={(item, index) => ({ index, height: height * 0.07, offset: 0 })}
    keyExtractor={(item) => item._id}
    extraData={extraData}
  />
);

const RenderReference = ({ reference,  navigator, data, origin  }) => (
  <TouchableOpacity
    style={{
      height: height * 0.09,
      marginTop: 10,
      marginBottom: 20,
      width: width * 0.7,
      borderRadius: 4,
      alignSelf: (data.origin.id === origin.id ? 'flex-end' : 'flex-start'),
      borderColor: '#16A085',
      borderWidth: 0.5,
      justifyContent: 'center',
      alignItems: 'center'
    }}
    onPress={() => {  navigator.push({ screen: 'View.Post', title: `Post by ${reference.origin.firstname}`, passProps: { target: reference }})}}
  > 
    <Text style={{ fontSize: 12, fontWeight: '600', color: '#909497', paddingBottom: 5}}>  { reference.origin ? `${reference.origin.firstname || ''} ${reference.origin.lastname || ''}` : 'John Phillips' } </Text>
    <Text style={{  fontSize: 10.5, fontWeight: '500', color: '#BDC3C7'}}> { reference.content }</Text>
  </TouchableOpacity>
)

const generateColor = (data, origin, focus) => {
  if(focus && focus.user.id === data.origin.id) return '#F7DC6F';
  if(data.origin.id === origin.id) return '#D5F5E3';
  return '#E8F8F5';
}

export const MessageComponent = ({ data, origin, user, navigator, focus }) => {
  if(data.referenceObject) return (
    <RenderReference reference={data.referenceObject} navigator={navigator} origin={origin} data={data}/>
  )
  return (
    <View
      style={{
        minHeight: height * 0.05,
        minWidth: width * 0.8,
        backgroundColor: generateColor(data, origin, focus),
        alignSelf: (data.origin.id === origin.id ? 'flex-end' : 'flex-start'),
        paddingTop: 5,
        borderRadius: 5,
        paddingRight: 10,
        paddingLeft: 10,
        paddingBottom: 15,
        marginBottom: 15,
        justifyContent: 'space-around'
       }}
    >
      <View style={{
          height: 15, 
          maxWidth: width * 0.8, 
          flexDirection: 'row', 
          flexWrap: 'nowrap', 
          marginBottom: 5, 
          justifyContent: 'space-between'
      }}
      >
        <Text style={{ 
          fontSize: 13, 
          fontWeight: '500', 
          color: '#B3B6B7', 
          }}>{ 
          data.origin.id !== user.id ?  
          `${data.origin.firstname || ''} ${data.origin.lastname || ''}` : 
          '' }</Text>
        <Text style={{ fontSize: 13, fontWeight: '500', color: '#B3B6B7', }}> { formatDate(data.createdAt) }</Text>
      </View>
      <Text style={{
   fontSize: 13, color: '#797D7F', fontWeight: '500', maxWidth: width * 0.7, textAlign: 'left'
  }}
      >{ data.content }
      </Text>
    </View>
  );
} 

export default MessageLog;
