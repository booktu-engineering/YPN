import mongoose from 'mongoose';

const PositionSchema = new mongoose.Schema({
  name: String,
  type: Number,
  meta: {},
  origin: {},
  archived: {
    type: Boolean,
    default: false
  },
  applicants: [],
  applications: []
});

const PositionModel = mongoose.model('Position', PositionSchema);

export default PositionModel;
