import axios from 'axios';
import ios from '../'

let instance;
class NotificationInteractorB {
  constructor() {
    this.mailer = axios.create({ baseURL: `http://localhost:3500/`, });
  }
  static interact = async (body) => {
    try {
      instance = axios.create({ baseURL: `http://localhost:3500/`, });
      instance.post(`/sendmail/?key=${body.key}`, { username: body.notification.destination, ...body.mail })
        .then((response) => {
          console.log(response.data)
        })
        .catch((err) => {
          console.log(err)
        })

      let { messageIO } = ios
      messageIO.to(`room-${body.notification.destination}`).emit('New-notif', body.notification);
    } catch (e) {
      throw e;
    }
  }
}

export default NotificationInteractorB;
