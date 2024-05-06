"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletepost = exports.getManageposts = exports.createPost = exports.getPosts = void 0;
const post_model_1 = __importDefault(require("../models/post.model"));
const getPosts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req.body;
    const posts = yield post_model_1.default.find({});
    res.status(201).json({ message: 'successfully retreated', posts: posts, success: true });
});
exports.getPosts = getPosts;
const createPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req.body;
    console.log(user, 'request body', req.body, ' ', req.body.title);
    const title = req.body.title || 'Untitled';
    const slug = title
        .split(' ')
        .join('-')
        .toLowerCase()
        .replace(/[^a-zA-Z0-9-]/g, '');
    const post = new post_model_1.default(Object.assign(Object.assign({}, req.body), { slug, userId: user.id }));
    try {
        const newPost = yield post.save();
        res.status(201).json({ message: 'Post created successfully!', success: true, post: newPost });
    }
    catch (error) {
        next(error);
    }
});
exports.createPost = createPost;
const getManageposts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req);
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.order === 'asc' ? 1 : -1;
        const posts = yield post_model_1.default.find(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, (req.query.userId && { userId: req.query.userId })), (req.query.category && { category: req.query.category })), (req.query.slug && { slug: req.query.slug })), (req.query.postId && { _id: req.query.postId })), (req.query.searchTerm && {
            $or: [
                { title: { $regex: req.query.searchTerm, $options: 'i' } },
                { content: { $regex: req.query.searchTerm, $options: 'i' } },
            ],
        })))
            .sort({ updatedAt: sortDirection })
            .skip(startIndex)
            .limit(limit);
        const totalPosts = yield post_model_1.default.countDocuments();
        const now = new Date();
        const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        const lastMonthPosts = yield post_model_1.default.countDocuments({
            createdAt: { $gte: oneMonthAgo },
        });
        res.status(200).json({
            posts,
            totalPosts,
            lastMonthPosts,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getManageposts = getManageposts;
const deletepost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
        res.status(403).json('You are not allowed to delete this post');
    }
    try {
        yield post_model_1.default.findByIdAndDelete(req.params.postId);
        res.status(200).json('The post has been deleted');
    }
    catch (error) {
        next(error);
    }
});
exports.deletepost = deletepost;
