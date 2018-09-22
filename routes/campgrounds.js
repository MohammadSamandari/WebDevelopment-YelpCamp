var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware/index");

// INDEX - show all campgrounds.
router.get("/", function (req, res) {
    // req.user contain information about the logged in user.

    // Get all the campgrounds from db
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log(err)
        } else {
            res.render("campgrounds/index", { campgrounds: allCampgrounds });
        }
    });

});

// CREATE ROUTE - Add new campground to DB
router.post("/", middleware.isLoggedIn, function (req, res) {
    // Get Data from form and add to campground object.
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = { name: name, price: price, image: image, description: desc, author: author };

    // Create a new campground and save to database
    Campground.create(newCampground, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            // redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });
});

// NEW ROUTE - Show form to create new campground
router.get("/new", middleware.isLoggedIn, function (req, res) {
    res.render("campgrounds/new");
})

// SHOW ROUTE - Show info about one campground
router.get("/:id", function (req, res) {
    // find the camground with provided id.
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            // render show template with that campground.
            res.render("campgrounds/show", { campground: foundCampground });
        }
    });

});

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function (req, res) {
    Campground.findById(req.params.id, function (err, foundCampground) {
        res.render("campgrounds/edit", { campground: foundCampground });
    });
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function (req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (err, updatedCampgroud) {
        if (err) {
            console.log(err);
            return res.send("ERROR");
        }
        res.redirect("/campgrounds/" + req.params.id);
    });
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function (req, res) {
    Campground.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            console.log(err);
            return res.send("Error");
        }
        res.redirect("/campgrounds");
    });
});

module.exports = router;