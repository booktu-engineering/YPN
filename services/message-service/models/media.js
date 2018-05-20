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
  internalMedia: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
})

const Media = mongoose.model('Media', mediaSchema);

export default Media;
