import express from 'express';
import { create, deleteevent, getevents } from '../controllers/event.controller.js';
import { verifyToken } from '../../utills/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, create)
router.get('/getevents', getevents)
router.delete('/deleteevent/:eventId/:userId', verifyToken, deleteevent)

export default router;