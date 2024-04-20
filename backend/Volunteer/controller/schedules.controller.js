import { errorHandler } from "../../utills/error.js"
import Schedule from "../model/schedule.model.js";



export const create = async (req, res, next)=>{
    //check the person is volunteer manager or not
   
    if(!req.user.isVolunteerManager){
        return next(errorHandler(403,'You are not allowed to create a schedule'))
    }
    if(!req.body.scheduleId || !req.body.date || !req.body.day || !req.body.catagory || !req.body.time){
        return next(errorHandler(400,'Please provide all required fields'))
    }

    const slug = req.body.scheduleId
    .split(' ')
    .join('-')
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, '');

    const newSchedule = new Schedule({
        ...req.body,
            slug,
            userId: req.user.id, 
    });

    try{
        const savedSchedule = await newSchedule.save();
        res.status(201).json(savedSchedule);
    } catch (error){
      next(error);
    }

}