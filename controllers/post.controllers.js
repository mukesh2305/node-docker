const Post = require("../models/post.models");

exports.getAllPosts = async (req, res, next) => {
    try {
        const posts = await Post.find();
        res.status(200).json({
            message: "Posts fetched successfully!",
            posts: posts
        });
    } catch (err) {
        res.status(500).json({
            message: "Fetching posts failed!"
        });
    }
}


exports.getOnePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json({
            message: "Post fetched successfully!",
            post: post
        });
    } catch (err) {
        res.status(500).json({
            message: "Fetching post failed!"
        });
    }
}

exports.createPost = async (req, res, next) => {
    try {
        const post = await Post.create(req.body);
        res.status(201).json({
            message: "Post created successfully!",
            post: post
        });
    } catch (err) {
        console.log("err", err);
        res.status(500).json({
            message: "Creating post failed!"
        });
    }
}


exports.updatePost = async (req, res, next) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            message: "Post updated successfully!",
            post: post
        });
    } catch (err) {
        res.status(500).json({
            message: "Updating post failed!"
        });
    }
}

exports.deletePost = async (req, res, next) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: "Post deleted successfully!"
        });
    } catch (err) {
        res.status(500).json({
            message: "Deleting post failed!"
        });
    }
}