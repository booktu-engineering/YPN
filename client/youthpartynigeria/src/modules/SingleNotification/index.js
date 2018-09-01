import React from 'react';
import { TouchableOpacity, View, Image, Text } from 'react-native';
import { fetchUserThunk } from '../../actions/thunks/user';
import { dispatchNotification, StartProcess, EndProcess } from '../../helpers/uploader';
import { fetchSinglePost } from '../../actions/thunks/posts';
import Composer from '../iterator';


const imageUrl = 'https://res.cloudinary.com/dy8dbnmec/image/upload/v1535072474/logo.png'
const SingleNotification = ({ data, obj }) => (
        <TouchableOpacity onPress={() => handleNavigation(data, obj)}
        style={{ backgroundColor: (data.count > obj.lastCount ? '#F9E79F' : 'white'),flexDirection: 'row', alignItems: 'center', paddingVertical: 15, borderColor: '#E5E7E9', borderBottomWidth: 0.5 }}>
        <View style={{alignSelf: 'flex-start', width: 50, height: 50, marginHorizontal: 20}}>
        <Image source={{ uri: data.origin.avatar || imageUrl  }} resizeMode="center" style={{alignSelf: 'flex-start', width: 50, height: 50, borderRadius: 25}}/> 
        </View>
        <View>
        <Text style={{ fontSize: 13, color: '#797D7F'}}>{data.message}</Text>
        </View>
        <View></View>
        </TouchableOpacity>
)

const handleNavigation = (data, obj) => {
    if (!data || !obj) return;
    if (!data.target) return obj.dispatch(fetchUserThunk(data.origin.id)(obj.navigator));
    StartProcess(obj.navigator);
    fetchSinglePost(data.target.id)
    .then((target) => {
        EndProcess(obj.navigator)
        obj.navigator.push({ screen: 'View.Post', title: `Post by ${data.target.origin.firstname}`, passProps: { target: target.data }})
    })
    .catch(() => dispatchNotification(obj.navigator)('Sorry, couldnt complete that action'))
      

}

export default Composer(SingleNotification);