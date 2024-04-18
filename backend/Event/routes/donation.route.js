import express from 'express';
import { createdonation, deletedonation, getdonations} from '../controllers/donation.controller.js';
import { verifyToken } from '../../utills/verifyUser.js';

const router = express.Router();

router.post('/createdonation',verifyToken, createdonation)
router.get('/getdonations', getdonations)
router.delete('/deletedonation/:donationId/:userId', verifyToken, deletedonation);

export default router;