import express from 'express';
import { createdonation } from '../controllers/donation.controller.js';
import { verifyToken } from '../../utills/verifyUser.js';

const router = express.Router();

router.post('/createdonation',verifyToken, createdonation)

export default router;