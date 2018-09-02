import axios from 'axios';
import jwt from 'jsonwebtoken';
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
        const formatNotification = () => ({
          type: body.key,
          origin: body.user,
          target: body.key > 0 ? body.notification.body : null,
          message: body.notification.message,
          time: body

        });
        DispatchRemoteNotification([player.playerId], body.notification.message, heading, JSON.stringify(...formatNotification()));
        player.notifications.push({ ...formatNotification(), count: (player.notifications.length + 1) });
        player.save();
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

  static fetchAllNotifications = async (userId) => {
    const compare = (a, b) => {
      if (a.count < b.count) { return 1; }
      if (a.count > b.count) { return -1; }
      return 0;
    };
    const data = await PlayerModel.findOne({ userId });
    if (!data) return null;
    return { notifications: data.notifications.sort(compare), last: data.notifications.sort(compare)[0].count };
  }
}

// 19c93878-1c4e-4fd7-b8ad-7ddf9eebc81d

const DispatchRemoteNotification = (players, message, heading, data) => {
  axios
    .request({
      method: 'Post',
      url: 'https://onesignal.com/api/v1/notifications',
      data: {
        app_id: '19c93878-1c4e-4fd7-b8ad-7ddf9eebc81d',
        contents: {
          en: message
        },
        headings: {
          en: 'Youth Party'
        },
        include_player_ids: players,
        data
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
