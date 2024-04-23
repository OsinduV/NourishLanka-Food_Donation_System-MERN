import express, { Router } from 'express'
import { register,readallfb,updatefb,deletefb,searchfb,statuschange } from '../controllers/foodbank.controller.js';

const router =  express.Router();
//routes related to food bank
router.post('/register',register); 
router.get('/readallfb',readallfb);
router.put('/updatefb/:id',updatefb);
router.delete('deletefb/:id',deletefb);
router.get('/searchfb',searchfb);
router.put('/statuschange/:id',statuschange);

export default router
