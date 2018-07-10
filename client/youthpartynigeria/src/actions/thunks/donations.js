import axios from 'axios';
import config from '../../config';
import { dispatchNotification } from '../../helpers/uploader';

export const fetchAllDonations = navigator => (dispatch, getState) => axios.request({
  url: `${config.postUrl}/donations/`,
  method: 'get',
  headers: {
    Authorization: getState().users.token
  }
})
  .then((response) => {
    dispatch({ type: 'ALL_DONATIONS_RECEIVED', payload: response.data.data });
  })
  .catch((err) => {
    dispatchNotification(navigator)('Oops something went wrong');
    navigator.pop();
  });

export const filterThroughDonations = query => navigator => (dispatch, getState) => {
  const donations = getState().donations.all;
  const target = donations.filter(donation => donation.type === query.type && donation.meta.level === query.level);
  return navigator.showModal({
    title: 'Donations',
    screen: 'DonationM.Component',
    passProps: {
      ...query, target, level: query.level, category: query.type
    }
  });
};


export const fetchDonation = id => navigator => (dispatch, getState) => axios.request({
  url: `${config.postUrl}/donations/${id}`,
  method: 'get',
  headers: {
    Authorization: getState().users.token
  }
})
  .then((response) => {
    navigator.push({ screen: 'DonationPT', passProps: { data: response.data.data } });
  })
  .catch((err) => {
    dispatchNotification(navigator)('Hey, that did not work out, try again?');
    navigator.pop();
  });

export const makeADonation = donation => navigator => (dispatch, getState) =>
  // the donation itself should contain the paystack referenceID and the amount and todays date,
  axios.request({
    method: 'put',
    url: `${config.postUrl}/donations/donate/${donation.destination}`,
    data: donation,
    headers: {
      Authorization: getState().users.token
    }
  })
    .then(() => {
      dispatchNotification(navigator)('Thank you for contributing. Great Job!');
    })
    .catch(() => {
      dispatchNotification(navigator)('Oh wow that didnt go well. Not to worry, we thank you for contributing.');
    });
