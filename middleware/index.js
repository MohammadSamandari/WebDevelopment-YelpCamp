var Campground = require("../models/campground"),
    Comment = require("../models/comment");

// All the middleware goes here.

var middlewareObj = {};
middlewareObj.checkCampgroundOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function (err, foundCampground) {
            if (err) {
                console.log(err);
                req.flash("error", "Campground not found.");
                return res.redirect("back");
            }
            if (foundCampground.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error", "You don't have permission to do that.")
                res.redirect("back");
            }
        });
    } else {
        // this will redirect the user to previous page.
        req.flash("error", "You need to be logged in to do that.");
        res.redirect("back");
    }
};

middlewareObj.checkCommentOwnership = function checkCommentOwnership(req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function (err, foundComment) {
            if (err) {
                console.log(err);
                return res.redirect("back");
            }
            if (foundComment.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error", "You don't have permission to do that.");
                res.redirect("back");
            }

        });
    } else {
        req.flash("error", "You need to be logged in to do that.");
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    // it takes the massage and save it to flash and it wont be shown untill the next thing that we see. it only shoe it self in the next page.
    req.flash("error", "You need to be logged in to do that")
    res.redirect("/login");
};

module.exports = middlewareObj