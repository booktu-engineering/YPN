import { AsyncStorage } from 'react-native'
import io from 'socket.io-client';
import config from '../config';
import { incomingMessage, fetchAllConversations } from '../actions/thunks/conversations'



export default async (callback, dispatch, navigator, registry = {})  => {
    // check for the item
    let map = await AsyncStorage.getItem(`LastSeenMap`)
    let tray;
    if(!map) {
        await AsyncStorage.setItem(`LastSeenMap`, JSON.stringify(registry))
    }
    
    return  (user) => (ops) => {
  //establish the connection here
   const handler =  io.connect(`${config.realTimeUrl}/base`, { query: { userID: user.id }})
   handler.on(`new-message-convo`, async (data) => {
       //set it as unread
       tray = await AsyncStorage.getItem(`LastSeenMap`)
       tray = {...JSON.parse(tray), [data.destination]: data.visited };
        dispatch(fetchAllConversations(navigator))
        .then(() => dispatch(incomingMessage(data))) 
        callback(tray);
        AsyncStorage.setItem(`LastSeenMap`, JSON.stringify(tray));
   })

  const handleRetriveCurrentUnread = async () => {
    tray =  await AsyncStorage.getItem(`LastSeenMap`)
    callback(JSON.parse(tray))
  }

  const clearFromUnreadChats = async () => {
      callback(ops.target)
      AsyncStorage.setItem(`LastSeenMap`, JSON.stringify(ops.target)) 
    }

    if(ops.remove) return clearFromUnreadChats();
    if(ops.fetch) return handleRetriveCurrentUnread();

}

}