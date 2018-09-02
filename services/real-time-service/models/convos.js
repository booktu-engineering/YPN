import mongoose from 'mongoose';

/* eslint func-names: 0 */
const conversationSchema = new mongoose.Schema({
  members: {
    type: [],
    required: true
  },

  type: { type: Number },

  topic: { type: String, default: null, trim: true },

  startDate: {
    type: Date,
    trim: true
  },

  endDate: {
    type: Date,
    trim: true
  },

  focus: {
    type: Object,
  },

  details: {
    type: Object
  },

  archived: {
    type: Boolean,
    default: false
  },

  invites: [],

  origin: {
    type: Object,
  }
},
{
  timestamps: true
}
);

// conversationSchema.methods.getMessages = async function () {
//   const posts = await Post.find({ destination: this._id });
//   return posts;
// };

const Conversation = mongoose.model('Conversation', conversationSchema);
export default Conversation;
