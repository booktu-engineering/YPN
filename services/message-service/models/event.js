import mongoose from 'mongoose';
import axios from 'axios';

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
    type: [{ type: Number }]
  },
  details: {
    type: Object,
    default: {},
    required: true
  }
});

const Event = mongoose.model('Event', eventSchema);

export default Event
