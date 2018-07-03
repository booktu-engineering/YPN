import mongoose from 'mongoose'

mongoose.connect('mongodb://base:Hasstrup1234@ds219051.mlab.com:19051/youthpartynigeria', {
});

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
    refs: 'Conversation',
    default: null
  },
  type: {
    type: Number,
    required: true
  },
  media: {
    type: String,
  }
});

const Post = mongoose.model('Post', postSchema);


export default Post;
