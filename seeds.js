var mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest",
        image: "https://files.idssasp.com/public/C165/74315052-3173-4ae2-8f66-878f50c08e37.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Desert Mesa",
        image: "http://www.visitwestbranch.com/images/2014/hero/campground-hero.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Canyon Floor",
        image: "http://vancouverisland.com/wp-content/uploads/connections-images/malahat-mountain-meadows-rv-park/malahat-mountain-meadows-rv-park-malahat-camping-malahat-british-columbia_original-a1a0822c797529a42ef20550d7c3ed9e.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
]

function seedDB() {
    // Remove all campgrounds
    Campground.remove({}, function (err) {
        // if (err) {
        //     console.log(err);
        // } else {
        //     console.log("removed Camgrounds!")

        //     // Remove Comments
        //     Comment.remove({}, function (err) {
        //         if (err) {
        //             console.log(err);
        //         } else {
        //             console.log("removed Comments!")

        //             // add a few campgrounds
        //             data.forEach(function (seed) {
        //                 Campground.create(seed, function (err, campground) {
        //                     if (err) {
        //                         console.log(err);
        //                     } else {
        //                         console.log("Added Campground.")

        //                         // Create a comment on each campground
        //                         Comment.create(
        //                             {
        //                                 text: "This Place is great, but i wish there was internet",
        //                                 author: "Homer"
        //                             }, function (err, comment) {
        //                                 if (err) {
        //                                     console.log(err);
        //                                 } else {
        //                                     campground.comments.push(comment);
        //                                     campground.save(function (err) {
        //                                         if (err) {
        //                                             console.log(err);
        //                                         } else {
        //                                             console.log("Created New Comment");
        //                                         }
        //                                     });
        //                                 }
        //                             }
        //                         );
        //                     }
        //                 });
        //             });
        //         }
        //     });

        // }
    });


}

module.exports = seedDB;
