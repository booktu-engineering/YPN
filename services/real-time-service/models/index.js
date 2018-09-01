import mongoose from 'mongoose';

mongoose.connect('mongodb://base:Hasstrup1234@ds219051.mlab.com:19051/youthpartynigeria');

const Players = mongoose.Schema({
  userId: Number,
  playerId: String,
  notifications: []
});

const PlayersModel = mongoose.model('Players', Players);

export default PlayersModel;
