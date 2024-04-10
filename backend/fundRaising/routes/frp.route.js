import express from "express"
import { createFRP } from "../controllers/frp.controller.js";
import { verifyToken } from "../../utills/verifyUser.js";

const router = express.Router();

router.post('/createfrp',verifyToken ,createFRP);

export default router;