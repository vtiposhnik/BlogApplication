import mongoose from "mongoose";

export const postSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    heading: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    views: {
        type: Number,
        required: true
    },
    comments: {
        type: Number,
        required: true
    }
})

const Post = new mongoose.Model('Post', postSchema)

export default Post;