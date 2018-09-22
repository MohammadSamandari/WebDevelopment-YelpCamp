var express = require("express");
var router = express.Router({ mergeParams: true });
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//Comments New
router.get("/new", middleware.isLoggedIn, function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", { campground: campground })
        }
    });
});

//Comments Create
router.post("/", middleware.isLoggedIn, function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    req.flash("error", "Something went wrong");
                    console.log(err);
                } else {
                    // add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    // save comment
                    comment.save();

                    campground.comments.push(comment._id)
                    campground.save();
                    req.flash("success", "Successfully Added Comment");
                    res.redirect("/campgrounds/" + req.params.id);
                }
            });
        }
    });
});

// COMMENTS EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function (req, res) {
    Comment.findById(req.params.comment_id, function (err, foundComment) {
        if (err) {
            console.log(err);
            req.flash("error", err.message);
            return res.redirect("back");
        }
        res.render("comments/edit", { campground_id: req.params.id, comment: foundComment })
    });
});

// COMMENT UPDATE ROUTE
router.put("/:comment_id", middleware.checkCommentOwnership, function (req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, updatedComment) {
        if (err) {
            console.log(err);
            req.flash("error", err.message);
            return res.redirect("back");
        }
        res.redirect("/campgrounds/" + req.params.id);
    });
});

// COMMENT DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function (req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function (err) {
        if (err) {
            return res.redirect("back");
        }
        req.flash("success", "Comment Deleted");
        res.redirect("/campgrounds/" + req.params.id);
    });
});


module.exports = router;