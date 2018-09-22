var mongoose = require("mongoose");

// SCHEMA Setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    price: String,
    image: String,
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
            // ref it going to refer to the Model that we are going to refer to with this object id.
        },
        username: String
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
});

// Compiling Schema to a Model
module.exports = mongoose.model("Campground", campgroundSchema);
