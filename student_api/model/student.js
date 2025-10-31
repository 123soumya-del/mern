const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");


const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/studentDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// 🟢 ROUTES

// ⿡ GET all students
app.get("/students", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

// ⿢ POST - Add a new student
app.post("/students", async (req, res) => {
const { name, course, age, city } = req.body;
  const newStudent = new Student({ name, course, age, city });
  await newStudent.save();
  res.json({ message: "Student added successfully", student: newStudent });
});

// ⿣ PUT - Update a student by ID
app.put("/students/:id", async (req, res) => {
  const { id } = req.params;
  const { name, course, age, city } = req.body;
  const updatedStudent = await Student.findByIdAndUpdate(
    id,
    { name, course, age, city },
    { new: true }
  );
  res.json({ message: "Student updated", updatedStudent });
});

// ⿤ DELETE - Remove a student by ID
app.delete("/students/:id", async (req, res) => {
  const { id } = req.params;
  await Student.findByIdAndDelete(id);
  res.json({ message: "Student deleted successfully" });
});

// Server running
const PORT = 5000;
app.use(express.json());


