const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  name: String,
  rollNo: String,
  class: String
});

module.exports = mongoose.model('Student', StudentSchema);