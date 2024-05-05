import express from "express"
import { verifyToken } from "../../utills/verifyUser.js";
import { createFrpDonation, deletedonation, getFrpDonations, getTopFrpDonations } from "../controllers/frpdonation.controller.js";

const router = express.Router();

router.post('/createfrpdonation',verifyToken ,createFrpDonation);
router.get('/getfrpdonations', getFrpDonations);
router.get('/gettopfrps', getTopFrpDonations);
router.delete('/deletefrp/:donationId/:userId', verifyToken, deletedonation);



export default router;