import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema({
  subjectname: {
    type: [String],
    lowerCase: true,
  },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
  },
});
const subjectsModel = mongoose.model('Subject', subjectSchema);

export default subjectsModel;
