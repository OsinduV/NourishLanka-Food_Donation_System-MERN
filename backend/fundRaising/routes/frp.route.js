import express from "express"
import { createFRP, deletefrp, getfrps, updatefrp } from "../controllers/frp.controller.js";
import { verifyToken } from "../../utills/verifyUser.js";

const router = express.Router();

router.post('/createfrp',verifyToken ,createFRP);
router.get('/getfrps', getfrps);
router.put('/updatefrp/:frpId/:userId', verifyToken, updatefrp);
router.delete('/deletefrp/:frpId/:userId', verifyToken, deletefrp);

export default router;