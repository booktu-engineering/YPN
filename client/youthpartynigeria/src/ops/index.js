import axios from 'axios';
import config from '../config';
import { dispatchNotification, StartProcess, EndProcess } from '../helpers/uploader';

export const RequestPasswordReset = ({ email }) => (navigator) => {
  if (!email || !email.length) return dispatchNotification(navigator)('Please input the email you registered with');
  StartProcess(navigator);
  axios({
    method: 'Post',
    url: `${config.baseUrl}/fetch`,
    data: {
      user: {
        email
      }
    }
  })
    .then(response => SendResetPassWord(response.data.data)(navigator))
    .catch((err) => {
      EndProcess(navigator);
      dispatchNotification(navigator)('Sorry the email provided doesnt exist on the platform');
    });
};

export const SendResetPassWord = data => (navigator) => {
  axios({
    method: 'Post',
    url: `${config.baseUrl}/send/reset/password/${data.id}`
  })
    .then((response) => {
      EndProcess(navigator);
      dispatchNotification(navigator)(`We have sent a mail to ${data.email}. Please check ${data.firstname}`);
    })
    .catch((err) => {
      EndProcess(navigator);
      dispatchNotification(navigator)('Sorry we couldnt complete that action');
    });
};
