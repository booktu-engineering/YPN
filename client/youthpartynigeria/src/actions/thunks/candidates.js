import axios from 'axios';
import { dispatchNotification, StartProcess, EndProcess } from '../../helpers/uploader';
import config from '../../config';

// try to call this at the start of the application or wherever you like
// this function only brings the positions back
export const FetchAllPositions = navigator => cb => (dispatch, getState) => axios
  .request({
    method: 'get',
    url: `${config.electionUrl}/position`,
    headers: {
      Authorization: getState().users.token
    }
  })
  .then((response) => {
    // remember to filter out the position called 'excos'
    const payload = response.data.data.filter(item => item.name !== 'Excos');
    dispatch({ type: 'ALL_POSITIONS_GOTTEN', payload });
    EndProcess(navigator);
    if (cb) return cb(payload);
  })
  .catch((err) => {
    console.log(err);
    dispatchNotification(navigator)('Had some trouble fetching the open positions, would try again in a few');
    // set off an event to fetch the positions again async
  });

  // this api call will essentially return all the candidates, sponsored
  // and aspirants, you can access them in response.data.sponsored, response.data.aspirants
  //
export const FetchAllCandidates = navigator => cb => (dispatch, getState) => axios
  .request({
    method: 'get',
    url: `${config.electionUrl}/candidates`,
    headers: {
      Authorization: getState().users.token
    }
  })
  .then((response) => {
    dispatch({ type: 'SPONSORED_CANDIDATES_GOTTEN', payload: response.data.sponsored });
    dispatch({ type: 'ASPIRANTS_GOTTEN', payload: response.data.aspirants });
    if (cb) return cb({ sponsored: response.data.sponsored, aspirants: response.data.aspirants });
  })
  .catch((err) => {
    dispatchNotification(navigator)('Had some trouble fetching the open positions, would try again in a few');
    // set off an event to fetch the positions again async
  });

// /**

export const FetchAllExcos = navigator => (dispatch, getState) => axios
  .request({
    method: 'get',
    url: `${config.electionUrl}/excos`,
    headers: {
      Authorization: getState().users.token
    }
  })
  .then((response) => {
    const { meta } = response.data.data;
    const payload = Object.keys(response.data.data.meta).map((item) => {
      const ref = {};
      ref.position = item;
      return { ...ref, ...meta[item] };
    });
    dispatch({ type: 'ALL_EXCOS_GOTTEN', payload });
    console.log(payload);
    return payload;
  })
  .catch((err) => {
    EndProcess(navigator);
    dispatchNotification(navigator)('Something went wrong fetching the excos');
  });


export const ApplyForPosition = navigator => id => (dispatch, getState) => {
  // you might want to pop up the payment thing here
  if (getState().users.current.role < 1) return dispatchNotification(navigator)('You need to be a party member to do this');
  StartProcess(navigator);
  axios
    .request({
      method: 'post',
      url: `${config.electionUrl}/apply/position/${id}`,
      data: {},
      headers: {
        Authorization: getState().users.token
      }
    })
    .then(() => {
      EndProcess(navigator);
      dispatchNotification(navigator)('Great you\'ll be reached out to, shortly');
      navigator.pop();
    })
    .catch(() => {
      EndProcess(navigator);
      dispatchNotification(navigator)('Something went wrong and we couldn\'t complete your application, try again');
      navigator.pop();
    });
};
