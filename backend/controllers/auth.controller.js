import User from "../models/user.model.js"
import bcryptjs from 'bcryptjs'// to encrypt the password
import { errorHandler } from "../utills/error.js"

export const signup = async (req,res,next) =>{
   const { username,email,password } = req.body

   if(
    !username ||
    !email || 
    !password || 
    username ===''|| 
    email === '' || 
    password === ''
    ) 
    {
      next(errorHandler(400,'All fileds are  required'))
   }

   const hashedPassword = bcryptjs.hashSync(password,10)//encryption of the password

   const newUser = new User({
     username,
     email,
     password:hashedPassword
   })

   try{

    await newUser.save()
    res.json('Signup successfull' )

   }catch(error){
    next(error)
   }

   
}