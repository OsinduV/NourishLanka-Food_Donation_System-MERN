import express from 'express';

import { verifyToken } from '../../utills/verifyUser.js';
import { createfooddrive, deletefooddrive, getfooddrives } from '../controllers/fooddrive.controller.js';


const router = express.Router();

router.post('/createfooddrive',verifyToken, createfooddrive)
router.get('/getfooddrives', getfooddrives)
router.delete('/deletefooddrive/:fooddriveId/:userId', verifyToken, deletefooddrive);

export default router;