const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeacherSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  class: String
});

module.exports = mongoose.model('Teacher', TeacherSchema);