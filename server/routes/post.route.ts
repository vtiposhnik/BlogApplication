import { Router } from "express";
import { verifyToken } from "../utils/verifyUser";
import { createPost, getPosts } from "../controllers/post.controller";

const router = Router()

router.post('/create', verifyToken, createPost)
router.get('/get', getPosts)

export default router