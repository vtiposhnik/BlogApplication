import express from 'express';
import { verifyToken } from '../utils/verifyUser';
import {
  createComment,
  getPostComments,
  getcomments,
} from '../controllers/comment.controller';

const router = express.Router();

router.post('/create', verifyToken, createComment);
router.get('/getPostComments/:postId', getPostComments);
router.get('/getcomments', verifyToken, getcomments);

export default router;
