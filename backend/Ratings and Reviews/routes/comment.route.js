import express from 'express';
import { verifyToken } from '../utills/verifyUser.js';
import {
  createComment,
  deleteComment,
  editComment,
  getreviewComments,
  getcomments,
  likeComment,
} from '../controllers/comment.controller.js';

const router = express.Router();

router.review('/create', verifyToken, createComment);
router.get('/getreviewComments/:reviewId', getreviewComments);
router.put('/likeComment/:commentId', verifyToken, likeComment);
router.put('/editComment/:commentId', verifyToken, editComment);
router.delete('/deleteComment/:commentId', verifyToken, deleteComment);
router.get('/getcomments', verifyToken, getcomments);

export default router; 