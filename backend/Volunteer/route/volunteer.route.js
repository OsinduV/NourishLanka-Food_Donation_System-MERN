import express from 'express'
import { verifyToken } from '../../utills/verifyUser.js';
import { createvolunteer,getvolunteer,deletevolunteer} from '../controller/volunteer.controller.js'

const router = express.Router();

router.post('/createvolunteer',verifyToken,createvolunteer)
router.delete('/deletevolunteer/:userId/:userId',verifyToken,deletevolunteer)
router.get('/getvolunteer',getvolunteer)

export default router;