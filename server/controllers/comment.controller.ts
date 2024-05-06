
import { NextFunction, Request, Response } from "express";
import Comment from "../models/comment.model";

export const getcomments = async (req: any, res: Response, next: NextFunction) => {
    if (!req.user.isAdmin)
        res.status(403).json({ message: 'You are not allowed to get all comments', success: false })
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.sort === 'desc' ? -1 : 1;
        const comments = await Comment.find()
            .sort({ createdAt: sortDirection })
            .skip(startIndex)
            .limit(limit);
        const totalComments = await Comment.countDocuments();
        const now = new Date();
        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        );
        const lastMonthComments = await Comment.countDocuments({
            createdAt: { $gte: oneMonthAgo },
        });
        res.status(200).json({ comments, totalComments, lastMonthComments });
    } catch (error) {
        next(error);
    }
};

export const createComment = async (req: any, res: Response, next: NextFunction) => {
    try {
        const { content, postId, userId, user } = req.body;
        console.log(req.body)

        if (userId !== user.id) {
            res.status(403).json({ message: 'You are not allowed to create this comment', success: false })
        }

        const newComment: any = new Comment({
            content,
            postId,
            userId,
        });
        await newComment.save();

        res.status(200).json(newComment);
    } catch (error) {
        next(error);
    }
};

export const getPostComments = async (req: any, res: Response, next: NextFunction) => {
    try {
        const comments = await Comment.find({ postId: req.params.postId }).sort({
            createdAt: -1,
        });
        res.status(200).json(comments);
    } catch (error) {
        next(error);
    }
};
