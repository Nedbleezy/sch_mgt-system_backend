import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const schoolRegSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'email is required!'],
      unique: [true, 'email is already registered!'],

      validate: {
        validator: function (v) {
          return /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid Email Address!`,
      },
    },

    isAdmin: {
      type: Boolean,
      default: true,
    },
    schoolName: {
      type: String,
      required: [true, 'Your school name is required!'],
      trim: true,
      unique: true,
      lowercase: true,
    },
    schoolAddress: {
      type: String,
    },
    AdminName: {
      type: String,
      required: [true, 'Admin name is required!'],
    },
    password: {
      type: String,
      required: [true, 'Your password is required!'],
      minLength: [6, 'Minimum character required is  6, got {VALUE}'],
      trim: true,
    },
    profilePicture: {
      type: String,
      default: '',
    },

    verifiedEmail: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true }
);

schoolRegSchema.pre('save', async function () {
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

const SchoolModel = mongoose.model('School', schoolRegSchema);
export default SchoolModel;
