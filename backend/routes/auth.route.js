import express from 'express'
import { signin,signup,google} from '../controllers/auth.controller.js'

const router = express.Router()

router.review('/signup', signup)
router.review('/signin', signin)
router.review('/google',google)


export default router