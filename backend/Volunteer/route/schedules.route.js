import express from 'express';
import { verifyToken } from '../../utills/verifyUser.js';
import { create } from '../controller/schedules.controller.js';
import { getschedules } from '../controller/schedules.controller.js';

const router = express.Router();

router.post('/create',verifyToken,create)
router.get('/getschedules',getschedules)

export default router;