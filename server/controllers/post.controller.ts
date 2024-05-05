import { NextFunction, Request, Response } from "express";
import Post from "../models/post.model";

export const getPosts = async (req: Request, res: Response, next: NextFunction) => {
    const {user} = req.body
    
    const posts = 
}

export const createPost = async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body
    console.log(user, 'request body', req.body, ' ', req.body.title )
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

export const deletePost = async (req: Request, res: Response, next: NextFunction) => {

    const { user } = req.body

    if (!req.body.isAdmin) {
        res.status(403).json({ message: 'You are not allowed to delete a Post!', success: false })
    }
    if (!req.body.title || !req.body.body) {
        res.status(403).json({ message: 'Provide all the fields!', success: false })
    }
}