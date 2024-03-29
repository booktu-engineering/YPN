import mongoose from 'mongoose';

mongoose.connect('mongodb://base:Hasstrup1234@ds219051.mlab.com:19051/youthpartynigeria', {
});


const postSchema = new mongoose.Schema(
  {
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


    media: {
      type: String,
    },


    link: {
      type: String
    }
  },

  {
    timestamps: true
  }
);


const Post = mongoose.model('Post', postSchema);


export default Post;
