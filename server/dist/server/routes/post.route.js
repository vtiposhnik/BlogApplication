"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyUser_1 = require("../utils/verifyUser");
const post_controller_1 = require("../controllers/post.controller");
const router = (0, express_1.Router)();
router.post('/create', verifyUser_1.verifyToken, post_controller_1.createPost);
router.get('/get', post_controller_1.getPosts);
router.get('/getposts', post_controller_1.getManageposts);
router.delete('/deletepost/:postId/:userId', verifyUser_1.verifyToken, post_controller_1.deletepost);
exports.default = router;
