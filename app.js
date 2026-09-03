// Call in for express
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const Student = require("./models/student");

const app = express();

// Get environment port or use PORT 3000
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// URL routes so Express understands form data
app.use(express.urlencoded({ extended: true }));

// Set view engine to EJS
app.set("view engine", "ejs");

// Route to home page and return server date and time
app.get("/", (req, res) => {
    res.render("home", {
        currentTime: new Date().toLocaleString(),
        activePage: "home"
    });
});

// Route to the about page
app.get("/about", (req, res) => {
    res.render("about", {
        activePage: "about"
    });
});

// Render the form page
app.get("/form", (req, res) => {
    res.render("form", {
        activePage: "form"
    });
});

// Render the index page
app.get("/index", (req, res) => {
    res.render("index", {
        activePage: "index",
        message: "Hey do you see me?"
    });
});

// Render the contact page
app.get("/contact", (req, res) => {
    res.render("contact", {
        activePage: "contact",
        error: null
    });
});

// Max and min age are the age bounds for users
const maxAge = 25;
const minAge = 18;

// Display users
app.get("/users", (req, res) => {
    const users = [
        {
            name: "Tatah Withney",
            email: "tatah@example.com",
            age: Math.floor(Math.random() * (maxAge - minAge + 1)) + minAge
        },
        {
            name: "John Doe",
            email: "john@example.com",
            age: Math.floor(Math.random() * (maxAge - minAge + 1)) + minAge
        },
        {
            name: "Jane Doe",
            email: "jane@example.com",
            age: Math.floor(Math.random() * (maxAge - minAge + 1)) + minAge
        }
    ];

    res.render("users", {
        users: users,
        activePage: "users"
    });
});

// Handle contact form submission
app.post("/contact", (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).render("contact", {
            activePage: "contact",
            error: "<error>All fields are required.</error>"
        });
    }

    console.log("Contact submission:");
    console.log({
        name,
        email,
        message
    });

    res.redirect("/success");
});

// Render success message
app.get("/success", (req, res) => {
    res.render("success", {
        activePage: null
    });
});

// ===============================
// STUDENT CRUD ROUTES
// ===============================

// Create student form
app.get("/students/new", (req, res) => {
    res.render("student-form", {
        activePage: "students"
    });
});

// Get all students
app.get("/students", async (req, res) => {
    try {
        const students = await Student.find();

        res.render("students", {
            students,
            activePage: "students"
        });
    } catch (error) {
        console.error("Failed to fetch students:", error.message);
        res.status(500).send("Failed to fetch students");
    }
});

// Get one student
app.get("/students/:id", async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).send("Student not found");
        }

        res.render("student-detail", {
            student,
            activePage: "students"
        });
    } catch (error) {
        console.error("Failed to fetch student:", error.message);
        res.status(404).send("Student not found");
    }
});

// Create student
app.post("/students", async (req, res) => {
    try {
        const { name, email, course } = req.body;

        await Student.create({
            name,
            email,
            course
        });

        res.redirect("/students");
    } catch (error) {
        console.error("Failed to create student:", error.message);
        res.status(400).send("Failed to create student");
    }
});

// Update student
app.post("/students/:id/edit", async (req, res) => {
    try {
        const { name, email, course } = req.body;

        const student = await Student.findByIdAndUpdate(
            req.params.id,
            {
                name,
                email,
                course
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!student) {
            return res.status(404).send("Student not found");
        }

        res.redirect("/students");
    } catch (error) {
        console.error("Failed to update student:", error.message);
        res.status(400).send("Failed to update student");
    }
});

// Delete student
app.post("/students/:id/delete", async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);

        if (!student) {
            return res.status(404).send("Student not found");
        }

        res.redirect("/students");
    } catch (error) {
        console.error("Failed to delete student:", error.message);
        res.status(400).send("Failed to delete student");
    }
});

// ===============================
// MONGODB CONNECTION
// ===============================

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error.message);
    });