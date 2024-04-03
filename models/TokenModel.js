import mongoose from 'mongoose';

const tokenSchema = new mongoose.Schema({
  School_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
});

const Token = mongoose.model('token', tokenSchema);
export default Token;
