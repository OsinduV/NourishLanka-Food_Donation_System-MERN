import Volunteer from "../model/volunteer.model.js";
import { errorHandler } from "../../utills/error.js"

export const createvolunteer = async(req,res,next) => {
      console.log(req.body);
      //check for the user accesbility
      if (!req.user || !req.user.id) {
        return next(errorHandler(401, 'User authentication failed'));
    }
    
    if(
        !req.body.scheduleId||
        !req.body.fullName ||
        
        !req.body.email|| 
        !req.body.address ||
       !req.body.phoneNumber ||
         !req.body.district || 
         !req.body.date ||
         !req.body.day || 
         !req.body.category || 
         !req.body.time
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
};

export const getvolunteer = async (req,res,next)=> {
    try{

        const startIndex = parseInt(req.query.startIndex) || 0;

        //http://localhost:5000/api/schedules/getschedules?limit=1
        const limit = parseInt(req.query.limit) || 9;  //9 is the number of schedules which we are requesting.

        const sortDirection = req.query.order === 'asc' ? 1 : -1;

        const volunteers = await Volunteer.find({
            ...(req.query.userId && { userId: req.query.userId }),
            ...(req.query.fullName && { category: req.query.fullName}),
            ...(req.query.email && { day: req.query.email}),
            ...(req.query.address && { day: req.query.address }),
            ...(req.query.phoneNumber && { category: req.query.phoneNumber }),
            ...(req.query.category && { category: req.query.category }),
            ...(req.query.day && { day: req.query.day }),
            ...(req.query.district && { day: req.query.district }),
            ...(req.query.date && { day: req.query.date }),
            ...(req.query.time && { day: req.query.time }),
            ...(req.query.slug && { slug: req.query.slug }),
            ...(req.query.scheduleId && { _id: req.query.scheduleId }),
            ...(req.query.searchTerm && {
                //using or it alows us to search between two places
              $or: [ 
                { category: { $regex: req.query.searchTerm, $options: 'i' } }, //by regex tool it allows to search inside the title and from i, it tells that lowecase or uppercase is not important
                { day: { $regex: req.query.searchTerm, $options: 'i' } },
              ],
        }),
    })   .sort({ updatedAt: sortDirection })
    .skip(startIndex)
    .limit(limit);
    
    //count the total number of volunteers
    const totalvolunteers = await Volunteer.countDocuments();

    //to count volunteers on last month ( from today to last month )
    const oneMonthAgo = new Date();
    
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    //last months volunteers
    const lastMonthvolunteers = await Volunteer.countDocuments({
        createdAt: { $gte: oneMonthAgo },
      });

      //response
      res.status(200).json({
        volunteers,
        totalvolunteers,
        lastMonthvolunteers,
      });
  


    }catch(error){
        next(error);
    }
};

export const deletevolunteer = async (req,res,next) => {
  
  if ( req.user.id !== req.params.userId) {
     return next(errorHandler(403, 'You are not allowed to delete '));
 }
 try {
     await Volunteer.findByIdAndDelete(req.params.userId);
     res.status(200).json('The user has been deleted');
   } catch (error) {
     next(error);
   }


};



