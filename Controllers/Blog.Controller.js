"use strict"
const Mongoose = require('mongoose');
const Blog = require('../Models/Blog.Model');
const { validateToken } = require('../validator');

// Get all posts
exports.getPosts = async (request, h) => {
    try {
        const posts = await Blog.find().sort({createdAt: -1});
        return h.response(posts).code(200);
    } catch (error) {
        return h.response({ message: error.message }).code(500);
    }
}

// Get post by id
exports.getPostById = async (request, h) => {
    try {
        const post = await Blog.findById(request.params.id);

        if(!post) {
            return h.response({ message: "Post not found" }).code(404);
        } 

        return h.response(post).code(200);
    } catch (error) {
        return h.response({ message: error.message }).code(500);
    }
}

// Get 6 recent posts
exports.getRecentPosts = async (request, h) => {
    try {
        const posts = await Blog.find({})
            .sort({createdAt: -1})
            .limit(6);

            return h.response(posts).code(200);
    } catch (error) {
        return h.response({ message: error.message }).code(500);
    }
}


// Add blogpost
exports.createPost = async (request, h) => {
    try {
        const { title, content } = request.payload;
        const user = await validateToken(request.headers.authorization);

        if(!user) {
            return h.response({ message: 'Invalid user data or token' }).code(401);
        }

        const newPost = new Blog({ title, content });
        const savedPost = await newPost.save();

        return h.response(savedPost).code(201);
    } catch (error) {
        return h.response({ message: error.message }).code(500);
    }
}

// Update post
exports.updatePost = async (request, h) => {
    try {
        const post = await Blog.findById(request.params.id);
        const user = await validateToken(request.headers.authorization);

        if(!user) {
            return h.response({ message: 'Invalid user data or token' }).code(401);
        }

        if(!post) {
            return h.response({ message: "Post not found" }).code(404);
        }


        post.title = request.payload.title || post.title;
        post.content = request.payload.content || post.content;
        post.updatedAt = Date.now();

        const updatedPost = await post.save();
        return h.response( updatedPost ).code(200);
    } catch (error) {
        return h.response({ message: error.message }).code(500);
    }
}

// Delete blogpost
exports.deletePost = async (request, h) => {
    try {
        const post = await Blog.findById(request.params.id);
        const user = await validateToken(request.headers.authorization);

        if(!user) {
            return h.response({ message: 'Invalid user data or token' }).code(401);
        }

        if(!post) {
            return h.response({ message: "Post not found" }).code(404);
        }


        await post.deleteOne();
        return h.response({ message: "Post deleted successfully" }).code(200);
    } catch (error) {
        return h.response({ message: error.message }).code(500);
    }
}
