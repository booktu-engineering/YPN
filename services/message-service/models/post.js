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

  likes: {
    type: Object,
    default: { count: 0, data: [] }
  },

  commentCount: {
    type: Number,
    default: 0
  },

  referenceObject: {
    type: Object,
    default: null
  },

  referenceID: {
    type: mongoose.Schema.Types.ObjectId,
    default: null
  },

  type: {
    type: Number,
    required: true
  },

  reportedTooManyTimes: {
    type: Boolean,
    default: false
  },

  media: [],

  links: [],

  reported: {
    type: Number,
    default: 0
  }
},

{
  timestamps: true
});

const Post = mongoose.model('Post', postSchema);


export default Post;
