import mongoose from 'mongoose';
import Post from './post';

/* eslint func-names: 0 */
const conversationSchema = new mongoose.Schema({
  members: {
    type: [Number],
    required: true
  },
  type: { type: Number, },
  topic: { type: String, default: null, trim: true },
  startDate: {
    type: Date,
    trim: true
  },
  endDate: {
    type: Date,
    trim: true
  },
}, {
  timestamps: true
});

conversationSchema.methods.getMessages = async function () {
  const posts = await Post.find({ destination: this.id });
  return posts;
};

const Conversation = mongoose.model('Conversation', conversationSchema);
export default Conversation;
