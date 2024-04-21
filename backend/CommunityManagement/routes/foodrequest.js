import express from 'express'

import { verifyToken } from '../../utills/verifyUser.js';
import { createfoodrequest, deletefoodrequest,getfoodrequests, getmyfoodrequests } from '../controllers/foodrequest.controller.js';

const router = express.Router();

router.post('/createfoodrequest',verifyToken,createfoodrequest)
router.get('/getmyfoodrequests',verifyToken,getmyfoodrequests)
router.delete('/deletefoodrequest/:myfoodrequestId/:userId',verifyToken,deletefoodrequest)
router.get('/getfoodrequests',getfoodrequests)

export default  router;