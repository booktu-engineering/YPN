import axios from 'axios';
import config from '../../config';
import { dispatchNotification,EndProcess } from '../../helpers/uploader';

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
    console.log(err);
    dispatchNotification(navigator)('Something went wrong');
    navigator.pop();
  });

export const filterThroughDonations = query => navigator => (dispatch, getState) => {
  const donations = getState().donations.all;
  const target = donations.filter(donation => donation.type === query.type && donation.meta.level === query.level);
  if (!target.length) {
    dispatchNotification(navigator)('No donations matching that currently. Thanks you');
    return navigator.pop();
  }
  return navigator.push({
    title: 'Donations',
    screen: 'DonationM.Component',
    passProps: {
      ...query,
      target
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
  .catch(() => {
    dispatchNotification(navigator)('Something went wrong, try again?');
    navigator.pop();
  });

export const makeADonation = donation => navigator => (dispatch, getState) => {
  // the donation itself should contain the paystack referenceID and the amount and todays date,
  console.log(donation);
  return axios.request({
    method: 'put',
    url: `${config.postUrl}/donations/donate/${donation.destination}`,
    data: donation,
    headers: {
      Authorization: getState().users.token
    }
  })
    .then(() => {
      EndProcess(navigator)
      dispatchNotification(navigator)('Thank you for contributing. Great Job!');
      navigator.pop();
    })
    .catch((err) => {
      console.log(err.response);
      EndProcess(navigator);
      dispatchNotification(navigator)('Thank you for contributing.');
      navigator.pop();
    });
  }
