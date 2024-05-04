import { Router } from "express";
import { verifyToken } from "../utils/verifyUser";
import { createPost } from "../controllers/post.controller";

const router = Router()

router.post('/create', verifyToken, createPost)

export default router