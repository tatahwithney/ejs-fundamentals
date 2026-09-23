const express = require("express");
const studentController = require("../controllers/studentController");

const router = express.Router();

// Display create form
router.get("/new", studentController.showCreateForm);

// Get all students
router.get("/", studentController.getAllStudents);

// Get one student
router.get("/:id", studentController.getStudent);

// Create student
router.post("/", studentController.createStudent);

// Update student
router.post("/:id/edit", studentController.updateStudent);

// Delete student
router.post("/:id/delete", studentController.deleteStudent);

module.exports = router;