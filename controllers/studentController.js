const Student = require("../models/student");

// Display create form
exports.showCreateForm = (req, res) => {
    res.render("student-form", {
        activePage: "students",
        formData: {},
        errors: {}
    });
};

// Get all students
exports.getAllStudents = async (req, res, next) => {
    try {
        const students = await Student.find();

        res.render("students", {
            students,
            activePage: "students"
        });
    } catch (error) {
        next(error);
    }
};

// Get one student
exports.getStudent = async (req, res, next) => {
    try {
        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).render("404", {
                activePage: "students"
            });
        }

        res.render("student-detail", {
            student,
            activePage: "students",
            errors: {},
            formData: {}
        });
    } catch (error) {
        next(error);
    }
};

// Create student
exports.createStudent = async (req, res, next) => {
    try {
        const { name, email, course } = req.body;

        await Student.create({
            name,
            email,
            course
        });

        res.redirect("/students");
    } catch (error) {
        if (error.name === "ValidationError") {
            const errors = {};

            for (const field in error.errors) {
                errors[field] = error.errors[field].message;
            }

            return res.status(400).render("student-form", {
                activePage: "students",
                formData: req.body,
                errors
            });
        }

        next(error);
    }
};

// Update student
exports.updateStudent = async (req, res, next) => {
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
            return res.status(404).render("404", {
                activePage: "students"
            });
        }

        res.redirect("/students");
    } catch (error) {
        if (error.name === "ValidationError") {
            const student = await Student.findById(req.params.id);

            if (!student) {
                return res.status(404).render("404", {
                    activePage: "students"
                });
            }

            const errors = {};

            for (const field in error.errors) {
                errors[field] = error.errors[field].message;
            }

            return res.status(400).render("student-detail", {
                student,
                activePage: "students",
                formData: req.body,
                errors
            });
        }

        next(error);
    }
};

// Delete student
exports.deleteStudent = async (req, res, next) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);

        if (!student) {
            return res.status(404).render("404", {
                activePage: "students"
            });
        }

        res.redirect("/students");
    } catch (error) {
        next(error);
    }
};