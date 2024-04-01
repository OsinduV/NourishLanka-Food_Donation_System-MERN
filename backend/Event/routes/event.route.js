import express from 'express';
import { create, getevents } from '../controllers/event.controller.js';
import { verifyToken } from '../../utills/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, create)
router.get('/getevents', getevents)

export default router;