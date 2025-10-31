const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  course: String,
  age: Number,
  city: String
});

module.exports = mongoose.model("Student", studentSchema);
const Student = require("./models/student");