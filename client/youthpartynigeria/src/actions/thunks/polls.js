import axios from 'axios';
import { dispatchNotification, StartProcess, EndProcess } from '../../helpers/uploader';
import config from '../../config';

export const fetchAllQuestions = navigator => (dispatch, getState) => {
  StartProcess(navigator);
  axios.request({
    method: 'get',
    url: `${config.postUrl}/questions/`,
    headers: {
      Authorization: getState().users.token
    }
  })
    .then((response) => {
      dispatch({ type: 'ALL_QUESTIONS_RECEIVED', payload: response.data.data });
      EndProcess(navigator);
    })
    .catch(() => {
      EndProcess(navigator);
      dispatchNotification(navigator)('Something went wrong');
    });
};

// ensure that the id of the election is in the body
export const VoteResponse = navigator => data => (dispatch, getState) => {
  StartProcess(navigator);
  console.log(data);
  axios.request({
    method: 'put',
    url: `${config.postUrl}/questions/respond`,
    data,
    headers: {
      Authorization: getState().users.token
    }
  })
    .then(() => {
      EndProcess(navigator);
      dispatchNotification(navigator)('Thank you for voting');
      navigator.pop();
    })
    .catch(() => {
      EndProcess(navigator);
      dispatchNotification(navigator)('Something went wrong. Try again. Thank you');
      navigator.pop();
    });
};

export const setAsTarget = navigator => payload => (dispatch) => {
  StartProcess(navigator);
  dispatch({ type: 'TARGET_ELECTION_SET', payload });
  navigator.push({ screen: 'Voting.Screen', title: 'Elections' });
  EndProcess(navigator);
};
