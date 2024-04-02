import express from 'express';
import { verifyToken } from '../../utills/verifyUser.js';
import { create } from '../controllers/recipientpost.controller.js';


const router = express.Router();

router.post('/create', verifyToken, create)


export default router;