import express from 'express';
import { createdonation, getdonations} from '../controllers/donation.controller.js';
import { verifyToken } from '../../utills/verifyUser.js';

const router = express.Router();

router.post('/createdonation',verifyToken, createdonation)
router.get('/getdonations', getdonations)

export default router;