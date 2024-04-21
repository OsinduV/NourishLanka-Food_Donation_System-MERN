import express from 'express';
import { verifyToken } from '../../utills/verifyUser.js';
import { create, deleteschedule } from '../controller/schedules.controller.js';
import { getschedules ,updateschedule} from '../controller/schedules.controller.js';


const router = express.Router();

router.post('/create',verifyToken,create)
router.get('/getschedules',getschedules)
router.delete('/deleteschedule/:scheduleId/:userId',verifyToken,deleteschedule)
router.put('/updateschedule/:scheduleId/:userId',verifyToken,updateschedule)

export default router;