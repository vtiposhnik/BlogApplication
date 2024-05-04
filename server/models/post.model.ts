import mongoose from "mongoose";

export const postSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
            unique: true,
        },
        image: {
            type: String,
            default:
                'https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post.png',
        },
        category: {
            type: String,
            default: 'uncategorized',
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        comments: {
            type: Number,
            required: false
        },
        views: {
            type: Number,
            required: false
        }
    },
    { timestamps: true }
);

const Post = mongoose.model('Post', postSchema)

export default Post;
