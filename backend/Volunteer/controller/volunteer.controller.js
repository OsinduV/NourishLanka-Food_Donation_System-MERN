import Volunteer from "../model/volunteer.model.js";
import { errorHandler } from "../../utills/error.js"

export const createvolunteer = async(req,res) => {
      console.log(req.body);
      //check for the user accesbility
      if (!req.user || !req.user.id) {
        return next(errorHandler(401, 'User authentication failed'));
    }
    
    if(!req.body.fullName ||
        !req.body.email|| 
        !req.body.address ||
         !req.body.phoneNumber ||
         !req.body.district || 
         !req.body.volunteeringDay ||
         !req.body.volunteeringType || 
         !req.body.volunteeringTime
          ){
        return next(errorHandler(400,'Please provide all required fields'))
    }

    const slug = req.body.fullName
    .split(' ')
    .join('-')
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, '');
    console.log(req.body);
    
    //create a new volunteer
    const newVolunteer = new Volunteer({
        ...req.body,
            slug,
            userId: req.user.id, 
    });

    try{
        //save volunteer details to the database

        const savedVolunteer = await newVolunteer.save();

        //sending response with saved Volunteer
        res.status(201).json(savedVolunteer);
    } catch (error){
        //error handling using middleware
      next(error);
    }
}