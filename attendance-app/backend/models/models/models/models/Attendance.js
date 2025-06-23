const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AttendanceSchema = new Schema({
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
  date: Date,
  class: String,
  records: [
    {
      student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
      status: String // Present / Absent
    }
  ]
});

module.exports = mongoose.model('Attendance', AttendanceSchema);