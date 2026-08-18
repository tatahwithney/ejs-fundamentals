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
        currentTime: new Date().toLocaleString()
    });
});
//route to the about page on /about request
app.get("/about", (req, res) => {
    res.render("about");
});

//Display key:value pairs for users in the object users
app.get("/users", (req, res) => {
    const users = [
        {
            name: "Tatah Withney",
            email: "tatah@example.com"
        },
        {
            name: "John Doe",
            email: "john@example.com"
        },
        {
            name: "Jane Doe",
            email: "jane@example.com"
        }
    ];

    res.render("users", {
        users: users
    });
});

//if local use 3000 or use render's PORT in deployment ( || ) 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});