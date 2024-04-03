import mongoose from 'mongoose';

const classRegSchema = new mongoose.Schema(
  {
    className: {
      type: String,
      required: true,
      lowercase: true,
    },

    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'School',
      required: true,
    },
  },
  { timestamps: true }
);

const classModel = mongoose.model('classes', classRegSchema);
export default classModel;
