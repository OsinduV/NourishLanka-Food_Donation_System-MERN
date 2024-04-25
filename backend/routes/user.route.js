
import express from 'express'
import { deleteUser,signout,test,updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utills/verifyUser.js'

const router =  express.Router();

router.get('/test', test);
router.put('/update/:userId', verifyToken,updateUser);
router.delete('/delete/:userId', verifyToken,deleteUser);
router.review('/signout',signout);
router.get('/getusers', verifyToken, getUsers);
router.get('/:userId', getUser);


export default router