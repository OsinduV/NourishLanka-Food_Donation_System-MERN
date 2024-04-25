import express, { Router } from 'express'
import { register,readallfb,updatefb,deletefb,searchfb,statusapprove,statusreject,pendingfb,readFb } from '../controllers/foodbank.controller.js';

const router =  express.Router();
//routes related to food bank
router.post('/register',register); 
router.get('/readallfb',readallfb);
router.put('/updatefb/:id',updatefb);
router.delete('/deletefb/:id',deletefb);
router.get('/searchfb',searchfb);
router.get('/pendingfb',pendingfb);
router.get('/readFb/:id',readFb);
router.put('/statusapprove/:id',statusapprove);
router.put('/statusreject/:id',statusreject);


export default router
