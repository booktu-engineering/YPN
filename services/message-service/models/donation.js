import mongoose from 'mongoose';
/* eslint func-names: 0, radix: 0 */
const donationSchema = new mongoose.Schema({
  target: {
    type: Number,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    default: 0
  },
  title: {
    type: String,
    trim: true,
    required: true
  },
  origin: {},
  valid: {
    type: Boolean,
    default: false
  },
  references: []
});

donationSchema.methods.getStatus = function () {
  const percentage = (parseInt(this.amount) / parseInt(this.target)) * 100;
  return { percentage: Math.floor(percentage), donors: this.references.length };
};

const Donation = mongoose.model('Donation', donationSchema);
export default Donation;
