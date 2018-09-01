import axios from 'axios';
import ios from '../index';
import PlayerModel from '../models';


let instance;
class NotificationInteractorB {
  constructor() {
    this.mailer = axios.create({ baseURL: 'https://ypn-mailer.herokuapp.com/', });
  }

  static interact = async (body) => {
    try {
      // const { messageIO } = ios; // remember to change this to the user id; there should be a destinationID now;
      // messageIO.to(`room-${body.notification.destinationID}`).emit('New-notif', body.notification);
      if (!body.emailOnly) {
        const player = await PlayerModel.findOne({ userId: body.notification.destinationID });
        if (!player) return; // theres no point dispatching the noftification to a user who isnt online;
        let heading = 'New notification on Youth Party';
        if (body.key === 4) {
          heading = 'New message';
        } else if (body.key === 5) {
          heading = 'Someone replied your post';
        }
        DispatchRemoteNotification([ player.playerId], body.notification.message, heading);  
      }

      instance = axios.create({ baseURL: 'https://ypn-mailer.herokuapp.com/', });
      instance.post(`/sendmail/?key=${body.key}`, { username: body.notification.destination, ...body.mail })
        .then((response) => {
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        }); 
    } catch (e) {
      throw e;
    }
  }
}

const DispatchRemoteNotification = (players, message, heading) => {
  axios
    .request({
      method: 'Post',
      url: 'https://onesignal.com/api/v1/notifications',
      data: {
        app_id: '19c93878-1c4e-4fd7-b8ad-7ddf9eebc81d',
        contents: {
          "en": message
        },
        headings: {
          "en": heading
        },
        include_player_ids: players
      },
      headers: {
        'Content-type': 'application/json; charset=utf-8',
        Authorization: 'Basic YjU0Nzc5YmUtYmYyNS00MjBmLWI5M2QtNWU5MDNjYTE2Nzgw'
      }
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};

export default NotificationInteractorB;
