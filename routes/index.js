var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

// root route
router.get("/", function (req, res) {
    res.render("landing")
});

// Show register Form
router.get("/register", function (req, res) {
    res.render("register");
});

// Handle sign up logic
router.post("/register", function (req, res) {
    var newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            req.flash("error", err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function () {
            req.flash("success", "Welcome to YelpCamp " + user.username);
            res.redirect("/campgrounds")
        });
    });
});

// Show Login Form
router.get("/login", function (req, res) {
    res.render("login");
});

// Handle Login Logic
router.post("/login", passport.authenticate("local", {
    successFlash: "Welcome Back",
    successRedirect: "/campgrounds",
    failureFlash: true,
    failureRedirect: "/login"
}), function (req, res) { });

// Handle Logout Logic
router.get("/logout", function (req, res) {
    req.logOut();
    req.flash("success", "Logged You Out!")
    res.redirect("/campgrounds")
});

module.exports = router;
