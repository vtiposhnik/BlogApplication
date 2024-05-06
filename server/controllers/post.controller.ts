import { NextFunction, Request, Response } from "express";
import Post from "../models/post.model";

export const getPosts = async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body

    const posts = await Post.find({})
    res.status(201).json({ message: 'successfully retreated', posts: posts, success: true })
}

export const createPost = async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body
    console.log(user, 'request body', req.body, ' ', req.body.title)
    const title = req.body.title || 'Untitled'

    const slug = title
        .split(' ')
        .join('-')
        .toLowerCase()
        .replace(/[^a-zA-Z0-9-]/g, '');

    const post = new Post({
        ...req.body,
        slug,
        userId: user.id
    })
    try {
        const newPost = await post.save()
        res.status(201).json({ message: 'Post created successfully!', success: true, post: newPost })
    } catch (error) {
        next(error)
    }
}
export const getManageposts = async (req: any, res: Response, next: NextFunction) => {
    try {
        console.log(req)
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.order === 'asc' ? 1 : -1;
        const posts = await Post.find({
            ...(req.query.userId && { userId: req.query.userId }),
            ...(req.query.category && { category: req.query.category }),
            ...(req.query.slug && { slug: req.query.slug }),
            ...(req.query.postId && { _id: req.query.postId }),
            ...(req.query.searchTerm && {
                $or: [
                    { title: { $regex: req.query.searchTerm, $options: 'i' } },
                    { content: { $regex: req.query.searchTerm, $options: 'i' } },
                ],
            }),
        })
            .sort({ updatedAt: sortDirection })
            .skip(startIndex)
            .limit(limit);

        const totalPosts = await Post.countDocuments();

        const now = new Date();

        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        );

        const lastMonthPosts = await Post.countDocuments({
            createdAt: { $gte: oneMonthAgo },
        });

        res.status(200).json({
            posts,
            totalPosts,
            lastMonthPosts,
        });
    } catch (error) {
        next(error);
    }
};

export const deletepost = async (req: any, res: Response, next: NextFunction) => {
    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
        res.status(403).json('You are not allowed to delete this post')
    }
    try {
        await Post.findByIdAndDelete(req.params.postId);
        res.status(200).json('The post has been deleted');
    } catch (error) {
        next(error);
    }
};