import mongoose from 'mongoose';

const studentsAttendance = new mongoose.Schema({
  studentName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
  },
  school: { type: mongoose.Schema.Types.ObjectId, ref: 'School' },
  attendance: [
    {
      date: {
        type: Date,
        required: true,
      },
      status: {
        type: String,
        enum: ['Present', 'Absent'],
        required: true,
      },
      subjectName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subject',
        required: true,
      },
    },
  ],
});

const studentsAttendanceModel = mongoose.model('Attendance', studentsAttendance);

export default studentsAttendanceModel;
