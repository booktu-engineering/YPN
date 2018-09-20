import axios from 'axios';
import { dispatchNotification, StartProcess, EndProcess } from '../../helpers/uploader';
import { UpdateUserInfo } from './user';
import states from '../../modules/SignUp/states';
import config from '../../config';

export const fetchAllQuestions = (navigator, key) => (dispatch, getState) => {
  !key  && StartProcess(navigator);
  axios.request({
    method: 'get',
    url: `${config.postUrl}/questions/`,
    headers: {
      Authorization: getState().users.token
    }
  })
    .then((response) => {
      const user = getState().users.current;
      let { data } = response.data;
      data = data.filter(item => (item.type === 1) || (item.meta.location.includes("All")) || (item.meta.location.includes(user.state)) || (item.meta.location.includes(user.lga)) || (item.meta.location.includes(user.ward)));
      dispatch({ type: 'ALL_QUESTIONS_RECEIVED', payload: data });
      EndProcess(navigator);
    })
    .catch((err) => {
      EndProcess(navigator);
      dispatchNotification(navigator)('Something went wrong');
    });
};

// ensure that the id of the election is in the body
export const VoteResponse = (navigator, cb) => data => (dispatch, getState) => {
  StartProcess(navigator);
  axios.request({
    method: 'put',
    url: `${config.postUrl}/questions/respond`,
    data,
    headers: {
      Authorization: getState().users.token
    }
  })
    .then((response) => {
      EndProcess(navigator);
      dispatch(fetchAllQuestions(navigator, 1));
      if (cb) return cb(response.data.data);
      dispatchNotification(navigator)('Thank you for voting');
      navigator.pop();
    })
    .catch(() => {
      EndProcess(navigator);
      dispatchNotification(navigator)('Something went wrong. Try again. Thank you');
      navigator.pop();
    });
};


export const VerifyVin = navigator => data => (dispatch, getState) => {
  // the last name of the user is compulsory
  if (!getState().users.current.lastname) return dispatchNotification(navigator)('You need to set up your lastname to complete this action.');
  const generateState = () => {
    // inec wants the id of the state luckily they match with the state.js file we have already;
    const items = states.filter(item => item.state.name === getState().users.current.state);
    return items.length ? items[0].state.id : '';
  };
  StartProcess(navigator);
  axios.request({
    method: 'post',
    url: `${config.electionUrl}/verify`,
    data: {
      vin: data.vin,
      state_id: generateState(),
      search_mode: 'vin',
      last_name: getState().users.current.lastname
    },
    headers: {
      Authorization: getState().users.token
    }
  })
    .then(() => {
      dispatchNotification(navigator)('Thanks for updating your voter eligibility, great job!');
      // do something about updating the user information here;
      dispatch(UpdateUserInfo({ vin: data.vin })(navigator)); // updates the db and updates the front end store
    })
    .catch((err) => {
      EndProcess(navigator);
      dispatchNotification(navigator)(` ${err.response ? err.response.data.message : 'Sorry, something went wrong, try again.'}`);
      navigator.dismissModal({});
    });
};


// id is the id of the current election
export const checkIfUniqueVoter = navigator => id => (vote, callback) => (dispatch, getState) => {
  StartProcess(navigator);
  return axios
    .request({
      method: 'post',
      url: `${config.electionUrl}/check/${id}`,
      headers: {
        Authorization: getState().users.token
      }
    })
    .then(() => {
      // this means this is the first time this user with this vin is voting;
      EndProcess(navigator);
      dispatch(VoteResponse(navigator, callback)(vote));
    })
    .catch((err) => {
      EndProcess(navigator);
      navigator.pop();
      // voted before;
      if (err.response && err.response.status === 409) return dispatchNotification(navigator)("Looks like you've participated in this election already, Thank you!");
      return dispatchNotification(navigator)('Sorry you cannot vote at this time');
    });
};


export const setAsTarget = navigator => payload => (dispatch) => {
  StartProcess(navigator);
  dispatch({ type: 'TARGET_ELECTION_SET', payload });
  navigator.push({ screen: 'Voting.Screen', title: 'Elections' });
  EndProcess(navigator);
};
