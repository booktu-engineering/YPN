import axios from 'axios';
import PostModel from './model'
import Player from '../../models';
import Conversation from '../../models/convos';
import { DispatchRemoteNotification } from '../../interactors/notifications';

const url = 'http://52.47.48.167/api/v1/posts';

class PostServiceBase {
  constructor(model, fetcher) {
    if (!model) {
      throw new Error('Please send in the right model');
    }
    this.model = model;
    this.fetcher = fetcher;
  }

  internalCreate = (body) => {
    this.model.create(body, (err, data) => {
      if (err) return err.message;
      Conversation.find({ _id: data.destination }, (err, convo) => {
        if (err || !convo) return;
        const memberIDs = convo.members.map(member => member.id);
        Player.find({ userId: { $in: memberIDs } }, (err, players) => {
          if (err || !players.length) return;
          players = players.map(player => player && player.playerId);
          const message = `${data.origin.username} sent a message to ${memberIDs.length > 2 ? 'your group' : 'you'}`
          DispatchRemoteNotification(players, message, '', {});
        });
      });
    });
  }

  externalCreate = (data) => {
    axios.request({
      url,
      data,
      method: 'post',
      headers: {
        Authorization: data.token
      }
    })
      .then(() => {
        console.log('Data created from the external api');
      })
      .catch(() => {
      // some message got lost in the db
        console.log('Yo the external service couldnt create the guy');
      });
  }
}

const PostService = new PostServiceBase(PostModel, axios);
export default PostService;
