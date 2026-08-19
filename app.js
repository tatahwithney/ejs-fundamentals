//Call in for express
const express = require("express");

const app = express();

//Get environment port or use PORT 3000
const PORT = process.env.PORT || 3000;

//url routes so express understands form data
app.use(express.urlencoded({ extended: true }));

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

//render the contact page
app.get("/contact", (req, res) => {
    res.render("contact", {
        activePage: "contact",
        error: null
    });
});

//max and min age are the age bounds for users listed at users
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

//render the success message once form data is valid
app.get("/success", (req, res) => {
    res.render("success", {
        activePage: null
    });
});

//if local use 3000 or use render's PORT in deployment ( || ) 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

message = "Hey do you see me?"