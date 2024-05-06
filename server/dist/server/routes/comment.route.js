"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifyUser_1 = require("../utils/verifyUser");
const comment_controller_1 = require("../controllers/comment.controller");
const router = express_1.default.Router();
router.post('/create', verifyUser_1.verifyToken, comment_controller_1.createComment);
router.get('/getPostComments/:postId', comment_controller_1.getPostComments);
router.get('/getcomments', verifyUser_1.verifyToken, comment_controller_1.getcomments);
exports.default = router;
