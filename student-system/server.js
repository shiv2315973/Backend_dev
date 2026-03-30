const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

/* 🔹 Step 2: DB Connection */
mongoose.connect("mongodb://127.0.0.1:27017/studentDB")
.then(()=> console.log("DB Connected"))
.catch(err => console.log(err));

/* 🔹 Step 3: Schema */
const studentSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    gpa: Number,
    city: String,
    courses: [String]
});

const Student = mongoose.model("Student", studentSchema);

/* 🔹 Step 4: CRUD APIs */

// Add Student
app.post("/add", async (req, res) => {
    const student = new Student(req.body);
    await student.save();
    res.send("Student Added");
});

// Get All Students
app.get("/students", async (req, res) => {
    const data = await Student.find();
    res.json(data);
});

// Find by Email
app.get("/student/:email", async (req, res) => {
    const data = await Student.findOne({ email: req.params.email });
    res.json(data);
});

// Update GPA
app.put("/update/:email", async (req, res) => {
    await Student.updateOne(
        { email: req.params.email },
        { $set: { gpa: req.body.gpa } }
    );
    res.send("GPA Updated");
});

// Delete Student
app.delete("/delete/:email", async (req, res) => {
    await Student.deleteOne({ email: req.params.email });
    res.send("Student Deleted");
});

/* 🔹 Start Server */
app.listen(3000, () => {
    console.log("Server running on port https://localhost:3000");
});