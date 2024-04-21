import express from 'express'
import { verifyToken } from '../../utills/verifyUser.js';
import { createvolunteer} from '../controller/volunteer.controller.js'

const router = express.Router();

router.post('/createvolunteer',verifyToken,createvolunteer);

export default router;