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

};
export const getschedules = async (req,res,next)=> {
    try{

        const startIndex = parseInt(req.query.startIndex) || 0;

        //http://localhost:5000/api/schedules/getschedules?limit=1
        const limit = parseInt(req.query.limit) || 9;  //9 is the number of schedules which we are requesting.

        const sortDirection = req.query.order === 'asc' ? 1 : -1;

        const schedules = await Schedule.find({
            ...(req.query.userId && { userId: req.query.userId }),
            ...(req.query.category && { category: req.query.category }),
            ...(req.query.day && { status: req.query.day }),
            ...(req.query.slug && { slug: req.query.slug }),
            ...(req.query.scheduleId && { _id: req.query.scheduleId }),
            ...(req.query.searchTerm && {
                //using or it alows us to search between two places
              $or: [ 
                { catagory: { $regex: req.query.searchTerm, $options: 'i' } }, //by regex tool it allows to search inside the title and from i, it tells that lowecase or uppercase is not important
                { day: { $regex: req.query.searchTerm, $options: 'i' } },
              ],
        }),
    })   .sort({ updatedAt: sortDirection })
    .skip(startIndex)
    .limit(limit);
    
    //count the total number of schedules
    const totalschedules = await Schedule.countDocuments();

    //to count schedules on last month ( from today to last month )
    const oneMonthAgo = new Date();
    
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    //last months schedules
    const lastMonthschedules = await Schedule.countDocuments({
        createdAt: { $gte: oneMonthAgo },
      });

      //response
      res.status(200).json({
        schedules ,
        totalschedules,
        lastMonthschedules,
      });
  


    }catch(error){
        next(error);
    }
};

export const deleteschedule = async (req,res,next) => {
     //check if the person is volunteer manager
     if (!req.user.isVolunteerManager || req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'You are not allowed to delete this schedule'));
    }
    try {
        await Schedule.findByIdAndDelete(req.params.scheduleId);
        res.status(200).json('The schedule has been deleted');
      } catch (error) {
        next(error);
      }
   

}