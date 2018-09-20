import axios from 'axios';
import PostModel from './model'
import Player from '../../models';
import Conversation from '../../models/convos';
import { DispatchRemoteNotification } from '../../interactors/notifications';

const url = 'http://52.47.48.167/api/v1/posts';

const dispatch = async (members, body, io) => {
  members.forEach((room) => {
    io.to(room).emit(`new-message-convo`, body)})
}

class PostServiceBase {
  constructor(model, fetcher) {
    if (!model) {
      throw new Error('Please send in the right model');
    }
    this.model = model;
    this.fetcher = fetcher;
  }

  internalCreate = (body) => (io) => {
    this.model.create(body, (err, data) => {
      if (err) return err.message;
      Conversation.findOne({ _id: data.destination }, (err, convo) => {
        if (err || !convo) return;
        convo.visited = Date.now();
        convo.save();
        const memberIDs = convo.members.map(member => member.id)
        const mappedMembers = memberIDs.map(id => `user-room-${id}`);
        dispatch(mappedMembers, body, io);
        Player.find({ userId: { $in: memberIDs } }, (err, players) => {
          if (err || !players.length) return;
          players = players.map(player => player && player.playerId);
          const message = `${data.origin.username} sent a message to ${memberIDs.length > 1 ? 'your group' : 'you'}`;
          DispatchRemoteNotification(players, message, '', {});
        });
      });
    });
  }

  // this should be fully async


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
