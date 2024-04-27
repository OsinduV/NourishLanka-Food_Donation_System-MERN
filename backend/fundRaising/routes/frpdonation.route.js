import express from "express"
import { verifyToken } from "../../utills/verifyUser.js";
import { createFrpDonation, getFrpDonations, getTopFrpDonations } from "../controllers/frpdonation.controller.js";

const router = express.Router();

router.post('/createfrpdonation',verifyToken ,createFrpDonation);
router.get('/getfrpdonations', getFrpDonations);
router.get('/gettopfrps', getTopFrpDonations);



export default router;