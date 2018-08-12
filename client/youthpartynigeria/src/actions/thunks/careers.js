import axios from 'axios';
import { dispatchNotification, StartProcess, EndProcess } from '../../helpers/uploader';
import config from '../../config';

const FetchAllCareers = navigator => (dispatch, getState) => {
  StartProcess(navigator);
  return axios.request({
    method: 'get',
    url: `${config.baseUrl}/careers`,
    headers: {
      Authorization: getState().users.token
    }
  })
    .then((response) => {
      EndProcess(navigator);
      console.log(response);
      dispatch({ type: 'ALL_CAREERS_GOTTEN', payload: response.data.data });
    })
    .catch(() => {
      dispatchNotification(navigator)('Something went wrong');
      navigator.pop();
    });
};

const ApplyForCareer = navigator => id => forwardResumeFunction => (_, getState) => {
  StartProcess(navigator);
  return axios.request({
    method: 'post',
    url: `${config.baseUrl}/careers/apply/${id}`,
    headers: {
      Authorization: getState().users.token
    }
  })
    .then(() => {
      EndProcess(navigator);
      dispatchNotification(navigator)('Awesome then, time to forward your cv');
      return forwardResumeFunction && forwardResumeFunction();
    })
    .catch(() => {
      EndProcess(navigator);
      return dispatchNotification('Sorry that did not go through, try again maybe');
    });
};
export {
  // you probably want to call this only when the component has mounted
  FetchAllCareers,
  ApplyForCareer,
};
