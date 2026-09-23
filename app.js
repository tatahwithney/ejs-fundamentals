const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const pageRoutes = require("./routes/pageRoutes");
const studentRoutes = require("./routes/studentRoutes");

const app = express();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(express.urlencoded({ extended: true }));

// View engine
app.set("view engine", "ejs");

// Routes
app.use("/", pageRoutes);
app.use("/students", studentRoutes);

// 404 middleware
app.use((req, res) => {
    res.status(404).render("404", {
        activePage: null
    });
});

// Central error handling middleware
app.use((err, req, res, next) => {
    console.error(err);

    res.status(500).render("error", {
        message: err.message || "Internal Server Error"
    });
});

// MongoDB connection
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