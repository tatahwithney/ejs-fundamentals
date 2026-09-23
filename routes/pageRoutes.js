const express = require("express");
const pageController = require("../controllers/pageController");

const router = express.Router();

router.get("/", pageController.home);
router.get("/about", pageController.about);
router.get("/form", pageController.form);
router.get("/index", pageController.index);
router.get("/contact", pageController.contact);
router.get("/users", pageController.users);
router.post("/contact", pageController.submitContact);
router.get("/success", pageController.success);

module.exports = router;