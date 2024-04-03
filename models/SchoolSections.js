import mongoose from 'mongoose';

const School_sectionsSchema = new mongoose.Schema({
  sectionName: [
    {
      type: String,
      lowercase: true,
    },
  ],

  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
    required: true,
  },
});

const SchoolSectionModel = mongoose.model('SchoolSection', School_sectionsSchema);
export default SchoolSectionModel;
