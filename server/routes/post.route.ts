import { Router } from "express";
import { verifyToken } from "../utils/verifyUser";
import { createPost, deletepost, getManageposts, getPosts } from "../controllers/post.controller";

const router = Router()

router.post('/create', verifyToken, createPost)
router.get('/get', getPosts)
router.get('/getposts', getManageposts)
router.delete('/deletepost/:postId/:userId', verifyToken, deletepost)

export default router