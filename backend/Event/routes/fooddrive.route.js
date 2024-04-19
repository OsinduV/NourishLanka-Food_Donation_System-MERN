import express from 'express';

import { verifyToken } from '../../utills/verifyUser.js';
import { createfooddrive } from '../controllers/fooddrive.controller.js';

const router = express.Router();

router.post('/createfooddrive',verifyToken, createfooddrive)


export default router;