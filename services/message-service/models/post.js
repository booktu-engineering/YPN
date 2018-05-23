import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim: true
  },
  origin: {
    type: Object,
    required: true
  },
  destination: {
    type: mongoose.Schema.Types.ObjectId,
    default: null
  },
  likes: [],
  type: {
    type: Number,
    required: true
  },
  media: {
    type: String,
  },
  link: {
    type: String
  }
}, {
  timestamps: true
});

const Post = mongoose.model('Post', postSchema);


export default Post;
