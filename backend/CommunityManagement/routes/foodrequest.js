import express from 'express'

import { verifyToken } from '../../utills/verifyUser.js';
import { createfoodrequest, getmyfoodrequests } from '../controllers/foodrequest.controller.js';

const router = express.Router();

router.post('/createfoodrequest',verifyToken,createfoodrequest)
router.get('/getmyfoodrequests',verifyToken,getmyfoodrequests)

export default  router;