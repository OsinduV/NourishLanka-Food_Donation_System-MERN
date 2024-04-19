import express from 'express';

import { verifyToken } from '../../utills/verifyUser.js';
import { createfooddrive, deletefooddrive, deletemyfooddrive, getfooddrives, updatefstatus } from '../controllers/fooddrive.controller.js';


const router = express.Router();

router.post('/createfooddrive',verifyToken, createfooddrive)
router.get('/getfooddrives', getfooddrives)
router.delete('/deletefooddrive/:fooddriveId/:userId', verifyToken, deletefooddrive);
router.delete('/deletemyfooddrive/:fooddriveId/:userId', verifyToken, deletemyfooddrive);
router.put('/updatefstatus/:fooddriveId/:userId', verifyToken, updatefstatus)

export default router;