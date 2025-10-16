import mongoose from 'mongoose';

const holidaySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add holiday name'],
      trim: true,
    },
    date: {
      type: Date,
      required: [true, 'Please add holiday date'],
    },
    type: {
      type: String,
      enum: ['Public Holiday', 'Restricted Holiday', 'Optional'],
      default: 'Public Holiday',
    },
    description: {
      type: String,
      default: '',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Holiday = mongoose.model('Holiday', holidaySchema);

export default Holiday;
