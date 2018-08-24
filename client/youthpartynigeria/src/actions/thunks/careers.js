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
      dispatch({ type: 'ALL_CAREERS_GOTTEN', payload: response.data.data });
    })
    .catch(() => {
      dispatchNotification(navigator)('Something went wrong');
      navigator.pop();
    });
};

const ApplyForCareer = navigator => data => forwardResumeFunction => (_, getState) => {
  StartProcess(navigator);
  return axios.request({
    method: 'post',
    url: `${config.baseUrl}/careers/apply/${data.id}`,
    headers: {
      Authorization: getState().users.token
    }
  })
    .then(() => {
      EndProcess(navigator);
      if (!data.item.voluntary) {
       dispatchNotification(navigator)('Awesome then, time to forward your cv');
      } else {
        dispatchNotification(navigator)('Thank you for volunteering, We will reach out'); 
      }
      return navigator.pop();
      return forwardResumeFunction && forwardResumeFunction();
    })
    .catch(() => {
      EndProcess(navigator);
      navigator.pop();
      return dispatchNotification('Sorry that did not go through, try again maybe');
    });
};
export {
  // you probably want to call this only when the component has mounted
  FetchAllCareers,
  ApplyForCareer,
};
