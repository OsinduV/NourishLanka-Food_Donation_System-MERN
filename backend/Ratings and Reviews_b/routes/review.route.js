import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { create, deletereview, getreviews, updatereview } from '../controllers/review.controller.js';

const router = express.Router();

router.review('/create', verifyToken, create)
router.get('/getreviews', getreviews)
router.delete('/deletereview/:reviewId/:userId', verifyToken, deletereview)
router.put('/updatereview/:reviewId/:userId', verifyToken, updatereview)


export default router;