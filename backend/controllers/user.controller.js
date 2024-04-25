import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utills/error.js';
import User from '../models/user.model.js';

export const test = (req, res) => {
    res.json({ message: 'API is working!' });
  };

  //updateUser function 
  export const updateUser = async(req, res, next) =>{
    
    //if the userid is not equal to requested params userid, person is not authenticated.
    //if userid is not authenticated, no access to update
    if (req.user.id !== req.params.userId) {
      return next(errorHandler(403, 'You are not allowed to update this user'));
    }

    //password
    if (req.body.password) {

      //if password length is less than 6, display an error
      if (req.body.password.length < 6) {
        return next(errorHandler(400, 'Password must be at least 6 characters'));
      }

      //if tge password is valid, encrypt the password
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    //username conditions
    if (req.body.username) {
      //if the username length is less than 7 characters and more than 20 characters,error
      if (req.body.username.length < 7 || req.body.username.length > 20) {
        return next(
          errorHandler(400, 'Username must be between 7 and 20 characters')
        );
      }

      //no spaces in username
      if (req.body.username.includes(' ')) {
        return next(errorHandler(400, 'Username cannot contain spaces'));
      }

      //lowercase username
      if (req.body.username !== req.body.username.toLowerCase()) {
        return next(errorHandler(400, 'Username must be lowercase'));
      }

      //usernames only match characters from a-z , A-Z , 0-9
      if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
        return next(
          errorHandler(400, 'Username can only contain letters and numbers')
        );
      }
    }
      //create request for updateuser
      try {
        const updatedUser = await User.findByIdAndUpdate(
          req.params.userId,
          {
            //set is a method of updating
            $set: {
              username: req.body.username,
              email: req.body.email,
              profilePicture: req.body.profilePicture,
              password: req.body.password,
            },
          },

          //in order to send the updated information
          //will send back the new information
          { new: true }

        );

        //update without the password
        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);

      } catch (error) {
        next(error);
      }
  };


  //deleteUser function

  //check the owner of the account
  export const deleteUser = async (req, res, next) => {

    //if the user id in the cookie is not equal to the given id return error
    if (req.user.id !== req.params.userId) {
      return next(errorHandler(403, 'You are not allowed to delete this user'));
    }
    try {
      await User.findByIdAndDelete(req.params.userId);
      res.status(200).json('User has been deleted');
    } catch (error) {
      next(error);
    }
  };


  //signout function
  //clear the cookie
  export const signout = (req, res, next) => {
    try {
      res
        .clearCookie('access_token')
        .status(200)
        .json('User has been signed out');
    } catch (error) {
      next(error);
    }
  };

  export const getUsers = async (req,res) => {
    if(!req.user.isAdmin){
      return next(errorHandler(403,'You are not allowed to see all users'))
    }
    try {
      const startIndex = parseInt(req.query.startIndex)||0;
      const limit = parseInt(req.query.limit) || 9;
      const sortDirection = req.query.sort === 'asc' ? 1:-1;

      const users = await User.find()
        .sort({createdAt: sortDirection})
        .skip(startIndex)
        .limit(limit);

        const usersWithoutPassword = users.map((user) => {
          const {password, ...rest} = user._doc;
          return rest;
        });

        const totalUsers = await User.countDocuments();

        const now = new Date();

        const oneMonthAgo = new Date (
          now.getFullYear(),
          now.getMonth() -1,
          now.getDate()
        );

        const lastMonthUsers = await User.countDocuments({
          createdAt : { $gte : oneMonthAgo},
        });

        res.status(200).json ({
          users:usersWithoutPassword,
          totalUsers,
          lastMonthUsers,
        });


    } catch (error) {
      next(error);
    }
  };