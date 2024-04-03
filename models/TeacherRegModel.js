import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const teacherSchema = new mongoose.Schema({
  surname: {
    type: String,
    required: true,
    lowercase: true,
    required: [true, 'surname is required'],
  },
  firstname: {
    type: String,
    lowercase: true,
    required: [true, 'firstname is required!'],
  },
  lastname: {
    type: String,
    required: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: [true, 'email is required!'],

    validate: {
      validator: function (v) {
        return /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid Email Address!`,
    },
  },
  password: {
    type: String,
    required: [true, 'Your password is required!'],
    minLength: [6, 'Min character required is  6, got {VALUE}'],
    trim: true,
  },
  profilePicture: {
    type: String,
    default: '',
  },

  role: {
    type: String,
    default: 'Teacher',
  },
  AssignedClasses: {
    type: String,
    required: [true, 'please assign a class to the teacher'],
  },
  school_section: {
    type: String,
    required: [true, 'please specify a section e.g Primary Section'],
  },
  subjectsToTeach: [
    {
      type: String,
      required: [true, 'please specify a subject/subjects for the  teacher'],
    },
  ],

  school_ID: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'School',
      required: [true, 'your school Id is required!'],
    },
  ],
});

teacherSchema.pre('save', async function () {
  // confirm this check again and know why its neccessary
  if (!this.isModified('password')) {
    return;
  }

  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    // Hash the password with the salt
    const hashedPassword = await bcrypt.hash(this.password, salt);
    // Replace the plain password with the hashed password
    this.password = hashedPassword;
  } catch (error) {
    console.error(error);
  }
});

const teacherModel = mongoose.model('teacher', teacherSchema);

export default teacherModel;
