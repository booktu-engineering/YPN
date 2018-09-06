import axios from 'axios';
import config from '../../config';
import { dispatchNotification, EndProcess, StartProcess } from '../../helpers/uploader';

export default navigator => (dispatch, getState) => {
  StartProcess(navigator);
  return axios({
    method: 'get',
    url: `${config.postUrl}/media/`,
    headers: {
      Authorization: getState().users.token
    }
  })
    .then((response) => {
      EndProcess(navigator);
      return response.data.data;
    })
    .catch((err) => {
      EndProcess(navigator);
      dispatchNotification(navigator)('Sorry, we could not fetch the pictures required');
      navigator.pop();
    });
};
