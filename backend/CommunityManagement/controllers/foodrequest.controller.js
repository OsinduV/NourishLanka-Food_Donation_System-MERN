import FoodRequest from "../models/foodrequest.model.js";
import { errorHandler } from "../../utills/error.js";

export const createfoodrequest = async(req,res,next) =>{


    //check for the user accesbility
    if (!req.user || !req.user.id) {
        return next(errorHandler(401, 'User authentication failed'));
    }

    if (!req.body.recipientname|| !req.body.district) {
        return next(errorHandler(400, 'Please provide all required fields'));
      }

      //generating a slug

      const slug = req.body.recipientname
      .split(' ')
      .join('-')
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, '');
      
      //create new food request
      const newFoodRequest = new FoodRequest({
        ...req.body,
        slug,
        userId: req.user.id,
      })

      try {

        //save food request details to the database
        const savedFoodRequest = await newFoodRequest.save();
        //sending reponse with saved foodrequest
        res.status(201).json(savedFoodRequest);
      } catch (error) {
        //error handling using middleware
        next(error);
      }



}