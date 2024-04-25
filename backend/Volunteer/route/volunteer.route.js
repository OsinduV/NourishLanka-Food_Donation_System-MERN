import express from 'express'
import { verifyToken } from '../../utills/verifyUser.js';
import { createvolunteer,getvolunteer} from '../controller/volunteer.controller.js'

const router = express.Router();

router.post('/createvolunteer',verifyToken,createvolunteer)
router.get('/getvolunteer',getvolunteer)

export default router;