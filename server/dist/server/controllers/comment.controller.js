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
exports.getPostComments = exports.createComment = exports.getcomments = void 0;
const comment_model_1 = __importDefault(require("../models/comment.model"));
const getcomments = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user.isAdmin)
        res.status(403).json({ message: 'You are not allowed to get all comments', success: false });
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.sort === 'desc' ? -1 : 1;
        const comments = yield comment_model_1.default.find()
            .sort({ createdAt: sortDirection })
            .skip(startIndex)
            .limit(limit);
        const totalComments = yield comment_model_1.default.countDocuments();
        const now = new Date();
        const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        const lastMonthComments = yield comment_model_1.default.countDocuments({
            createdAt: { $gte: oneMonthAgo },
        });
        res.status(200).json({ comments, totalComments, lastMonthComments });
    }
    catch (error) {
        next(error);
    }
});
exports.getcomments = getcomments;
const createComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { content, postId, userId, user } = req.body;
        console.log(req.body);
        if (userId !== user.id) {
            res.status(403).json({ message: 'You are not allowed to create this comment', success: false });
        }
        const newComment = new comment_model_1.default({
            content,
            postId,
            userId,
        });
        yield newComment.save();
        res.status(200).json(newComment);
    }
    catch (error) {
        next(error);
    }
});
exports.createComment = createComment;
const getPostComments = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comments = yield comment_model_1.default.find({ postId: req.params.postId }).sort({
            createdAt: -1,
        });
        res.status(200).json(comments);
    }
    catch (error) {
        next(error);
    }
});
exports.getPostComments = getPostComments;
