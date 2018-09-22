var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
                // ref it going to refer to the Model that we are going to refer to with this object id.
        },
        username: String
    }
});

var Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;