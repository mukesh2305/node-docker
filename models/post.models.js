const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "post title is required"],

    },
    body: {
        type: String,
        required: [true, "post body is required"],
    }
});
const Post = mongoose.model("Post", postSchema);
module.exports = Post;