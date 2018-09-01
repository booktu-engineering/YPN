import React from 'react';
import { TouchableOpacity, View, Image, Text } from 'react-native';
import { fetchUserThunk } from '../../actions/thunks/user';
import Composer from '../iterator';


const SingleNotification = ({ data, obj }) => (
        <TouchableOpacity onPress={() => handleNavigation(data, obj)}
        style={{ backgroundColor: (data.count > obj.lastCount ? '#F9E79F' : 'white'),flexDirection: 'row', alignItems: 'center', paddingVertical: 15, borderColor: '#a6a6a6', borderBottomWidth: 1}}>
        <View style={{alignSelf: 'flex-start', width: 50, height: 50, marginHorizontal: 20}}>
        <Image source={{ uri: '' }} resizeMode="center" style={{alignSelf: 'flex-start', width: 50, height: 50, borderRadius: 25}}/> 
        </View>
        <View>
        <Text>{data.message}</Text>
        </View>
        <View></View>
        </TouchableOpacity>
)

const handleNavigation = (data, obj) => {
    if (!data || !obj) return;
    if (!data.target) return obj.dispatch(fetchUserThunk(data.origin.id)(obj.navigator));
    obj.navigator.push({ screen: 'View.Post', title: `Post by ${data.target.origin.firstname}`, passProps: { target: data.target }})   

}

export default Composer(SingleNotification);