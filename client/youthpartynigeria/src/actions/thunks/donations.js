import axios from 'axios';
import config from '../../config';
import { dispatchNotification } from '../../helpers/uploader';

export const fetchAllDonations = navigator => (dispatch, getState) => axios.request({
  url: `${config.postUrl}/donations/`,
  method: 'get',
  headers: {
    Authorization: getState().users.token
  }
}).then((response) => {
  // dispatch the donations to state
  dispatch({ type: 'ALL_DONATIONS_RECEIVED', payload: response.data.data });
})
  .catch((err) => {
  // log the error for now
    console.log(err);
    dispatchNotification(navigator)('Oops something went wrong');
    navigator.pop();
  });

export const filterThroughDonations = (query) => (navigator) => (dispatch, getState) => {
  const donations =
}
