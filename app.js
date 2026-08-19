//Call in for express
const express = require("express");

const app = express();

//Get environment port or use PORT 3000
const PORT = process.env.PORT || 3000;

//set view engine to ejs
app.set("view engine", "ejs");

//rout to home page and return server date and time
app.get("/", (req, res) => {
    res.render("home", {
        currentTime: new Date().toLocaleString(),
        activePage: "home"
    });
});

//route to the about page on /about request
app.get("/about", (req, res) => {
    res.render("about", {
        activePage: "about"
    });
});

//render the form page
app.get("/form", (req, res) => {
    res.render("form", {
        activePage: "form"
    });
})

//render the index page, we donot explicitly refer to this as our home page
app.get("/index", (req, res) =>{
    res.render("index", {
        activePage: "index"
    });
})
const maxAge = 25;
const minAge = 18;
//Display key:value pairs for users in the object users
app.get("/users", (req, res) => {
    const users = [
        {
            name: "Tatah Withney",
            email: "tatah@example.com",
            age: Math.floor(Math.random()*(maxAge-minAge+1)) + minAge
        },
        {
            name: "John Doe",
            email: "john@example.com",
            age: Math.floor(Math.random()*(maxAge-minAge+1)) + minAge
        },
        {
            name: "Jane Doe",
            email: "jane@example.com",
            age: Math.floor(Math.random()*(maxAge-minAge+1)) + minAge
        }
    ];

    res.render("users", {
        users: users,
        activePage: "users"
    });
});

//if local use 3000 or use render's PORT in deployment ( || ) 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

message = "Hey do you see me?"