import User from "../models/user.model.js";

//imported bcryptjs to provide more security on passwords which are displayed on database data
import bcrypt from 'bcryptjs';
import { errorHandler } from "../utills/error.js";
import jwt from 'jsonwebtoken';


//Sign up
export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

//all fields required validation
  if (!username|| !email || !password || username === '' || email === '' || password === '') {
    //using the errorHandler function created in error.js
    next(errorHandler(400, 'All fields are required'));
  }

    //hashed password
    //10 is the number of source which is going to be mix with our password to make it secure
    const hashedPassword = bcrypt.hashSync(password,10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try{
    await newUser.save();
    res.json('Signup successful');
  }
  //catch errors
  catch(error){
    next(error);
  }
};



// Sign in
//get the email and password from the user and check the input fields
//check the email and password 
//if everythin is alright set a cookie inside the browser of the user, so later when you wants do some request inside the website,
//check the person authentication to be signed in or not
export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  //if any field is empty, set error
  if (!email || !password || email === '' || password === '') {
    next(errorHandler(400, 'All fields are required'));
  }

  try {
  //check email
    const validUser = await User.findOne({ email });

    //if there is no user with the given email
    if (!validUser) {
      return next(errorHandler(404, 'User not found'));
    }

  //check password
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, 'Invalid password'));
    }

    //create token
    const token = jwt.sign(
      //02.adding event organiser to the cookie////////////////////////////
      { id: validUser._id, isEventOrganiser:validUser.isEventOrganiser},
      process.env.JWT_SECRET 
      //process.env.HWT_SECRET is a secret key which is unique only for you
      //the token is created and based on the secret key
      //created and saved in env for the security and called it here
    );

    //seperate the password and it will be hidden from displaying(for security)
    const { password: pass, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }

};

export const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;

  try{
    const user = await User.findOne({ email });

    //if the user exists
    if (user) {
      const token = jwt.sign(

        ////////////04./////////////////////////
        { id: user._id, isEventOrganiser: user.isEventOrganiser },
        process.env.JWT_SECRET
      );

      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json(rest);

        //user is not allowed to sign in without password
        //hence a password will be generated and user will be able to change it later
      } else {
        const generatedPassword =
          Math.random().toString(36).slice(-8) +
          Math.random().toString(36).slice(-8);
        const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
        const newUser = new User({
          username:
            name.toLowerCase().split(' ').join('') +
            Math.random().toString(9).slice(-4),
          email,
          password: hashedPassword,
          profilePicture: googlePhotoUrl,
        });
        await newUser.save();
        const token = jwt.sign(
          //05./////////////////////////////////////////////////////////
          { id: newUser._id, isEventOrganiser: newUser.isEventOrganiser },
          process.env.JWT_SECRET
        );
        const { password, ...rest } = newUser._doc;
        res
          .status(200)
          .cookie('access_token', token, {
            httpOnly: true,
          })
          .json(rest);
      }

  }catch(error){
    next(error)
  }


}