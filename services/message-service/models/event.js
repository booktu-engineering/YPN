import mongoose from 'mongoose';
const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },

  startDate: {
    type: Date,
    required: true,
    trim: true
  },

  endDate: {
    type: Date,
    required: true,
    trim: true
  },

  members: {
    type: []
  },

  details: {
    type: Object,
    default: {},
    required: true
  },

  valid: {
    type: Boolean,
    default: false
  },

  origin: {
    type: Object,
    required: true
  },
  archived: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const Event = mongoose.model('Event', eventSchema);

export default Event
