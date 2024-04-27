import express from 'express';
import { createdonation, deletedonation, deletemydonation, getdonations, updatedstatus} from '../controllers/donation.controller.js';
import { verifyToken } from '../../utills/verifyUser.js';

const router = express.Router();

router.post('/createdonation',verifyToken, createdonation)
router.get('/getdonations', getdonations)
router.delete('/deletedonation/:donationId/:userId', verifyToken, deletedonation);
router.delete('/deletemydonation/:donationId/:userId', verifyToken, deletemydonation);
router.put('/updatedstatus/:donationId/:userId', verifyToken, updatedstatus)

export default router;