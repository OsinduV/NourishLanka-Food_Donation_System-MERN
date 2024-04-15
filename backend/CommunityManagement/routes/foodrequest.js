import express from 'express'

import { verifyToken } from '../../utills/verifyUser.js';
import { createfoodrequest } from '../controllers/foodrequest.controller.js';

const router = express.Router();

router.post('/createfoodrequest',verifyToken,createfoodrequest)

export default  router;