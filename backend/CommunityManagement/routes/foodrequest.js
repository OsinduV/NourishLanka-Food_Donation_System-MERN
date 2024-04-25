import express from 'express'

import { verifyToken } from '../../utills/verifyUser.js';
import { createfoodrequest,deletemyfoodrequest,getfoodrequests, updatefoodrequeststatus, } from '../controllers/foodrequest.controller.js';

const router = express.Router();

router.post('/createfoodrequest',verifyToken,createfoodrequest)
router.delete('/deletemyfoodrequest/:foodrequestId/:userId',verifyToken,deletemyfoodrequest)
router.get('/getfoodrequests',getfoodrequests)
router.put('/updatefoodrequeststatus/:foodrequestId/:userId',verifyToken,updatefoodrequeststatus,)

export default  router;