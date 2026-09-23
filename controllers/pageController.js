// Home page
exports.home = (req, res) => {
    res.render("home", {
        currentTime: new Date().toLocaleString(),
        activePage: "home"
    });
};

// About page
exports.about = (req, res) => {
    res.render("about", {
        activePage: "about"
    });
};

// Form page
exports.form = (req, res) => {
    res.render("form", {
        activePage: "form"
    });
};

// Index page
exports.index = (req, res) => {
    res.render("index", {
        activePage: "index",
        message: "Hey do you see me?"
    });
};

// Contact page
exports.contact = (req, res) => {
    res.render("contact", {
        activePage: "contact",
        error: null
    });
};

// Users page
exports.users = (req, res) => {
    const maxAge = 25;
    const minAge = 18;

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
        users,
        activePage: "users"
    });
};

// Handle contact form
exports.submitContact = (req, res) => {
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
};

// Success page
exports.success = (req, res) => {
    res.render("success", {
        activePage: null
    });
};