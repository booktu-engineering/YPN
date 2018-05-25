import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true
  },

  questions: {},

  options: {},

  responses: [],

  type: {
    type: Number,
    required: true
  },

  archived: {
    type: Boolean,
    default: false
  },

  meta: {
    type: Object
  }

},
{
  timestamps: true
}
);

const Question = mongoose.model('Question', questionSchema);

export default Question
