import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  images: {
    type: Array,
    default: [],
    trim: true
  },
  origin: {}
}, {
  timestamps: true
})

const Media = mongoose.model('Media', mediaSchema);

export default Media;
