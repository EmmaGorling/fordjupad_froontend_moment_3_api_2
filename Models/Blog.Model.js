const { required } = require('joi');
const Mongoose = require('mongoose');
const User = require('./User.Model');

const BlogSchema = new Mongoose.Schema(
    {
        title: {
            type: String, 
            required: true
        },
        content: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date
        }
    }
);

const Blog = Mongoose.model('Blog', BlogSchema);
module.exports = Blog;