import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    lowercase: true,
  },
  middlename: {
    type: String,
    lowercase: true,
  },
  lastname: {
    type: String,
    required: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
  },

  section: {
    type: String,
    enum: ['Primary School', 'Secondary School'],
    required: true,
    lowercase: true,
  },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
    required: true,
  },
  role: {
    type: String,
    default: 'Student',
  },
  RegDate: {
    type: Date,
    default: new Date(),
  },
});

const studentRegModel = mongoose.model('Student', studentSchema);

export default studentRegModel;
