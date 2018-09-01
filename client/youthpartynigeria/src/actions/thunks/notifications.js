
import { AsyncStorage } from 'react-native';

export const fetchAllNotifications = () => async (dispatch, getState) => axios({
  method: 'post',
  url: `${config.realTimeUrl}/fetch/${getState().users.current.id}`,
})
  .then(async (response) => {
    const count = await AsyncStorage.getItem('lastNotificationCount');
    const newCount = response.data.data.last - parseInt(count);
    dispatch({ type: 'SET_NOTIFICATIONS', payload: response.data.data.notifications, unSeenCount: newCount, lastSeenCount: count });
  })
  .catch((err) => {
    console.log(err);
    dispatch({ type: 'SET_NOTIFICATIONS', payload: [], count: 0 });
  });


export const clearNotificationCount = () => ({
  type: 'CLEAR_NOTIFICATION_COUNT'
});

export const receiveNotifications = notification => async (dispatch, getState) => {
  const { notifications, count } = getState().notifications;
  dispatch({ type: 'SET_NOTIFICATIONS', payload: [notification, ...notifications], count: (count + 1) });
};
