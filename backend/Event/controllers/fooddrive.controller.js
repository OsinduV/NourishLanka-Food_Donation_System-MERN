import { errorHandler } from "../../utills/error.js";
import Fooddrive from "../models/fooddrive.model.js";

const validateTime = (time) => {
    const timeRegex = /^\d{1,2}(\:\d{1,2})?\s?(?:AM|PM|am|pm)$/;
    return timeRegex.test(time);
};
//add validations to disabled buttons///////////////////////////
export const createfooddrive = async (req, res, next) => {
    try {
        // Check if the user information is available in the request
        if (!req.user || !req.user.id) {
            return next(errorHandler(401, 'User authentication failed'));
        }

        // Validate request body
        const requiredFields = ['eventtitle'];
        if (requiredFields.some(field => !req.body[field])) {
            return next(errorHandler(400, 'Please provide all required fields'));
        }

        // Validate event times
        if (!validateTime(req.body.eventtime)) {
            return next(errorHandler(400, 'Please provide valid times (e.g., "12:00 PM") '));
        }

        // Generate slug
        const slug = req.body.eventtitle
            .split(' ')
            .join('-')
            .toLowerCase()
            .replace(/[^a-zA-Z0-9-]/g, '');

        // Create new fooddrive
        const newFooddrive = new Fooddrive({
            ...req.body,
            slug,
            userId: req.user.id,
        });

        // Save fooddrive to database
        const savedFooddrive = await newFooddrive.save();

        // Respond with saved fooddrive
        res.status(201).json(savedFooddrive);
    } catch (error) {
        // Pass error to error handling middleware
        next(error);
    }
};

export const getfooddrives = async (req, res, next) => {
    try {
    //localhost:3500/api/fooddrive/getfooddrives?startIndex=1
    const startIndex = parseInt(req.query.startIndex) || 0;

    //localhost:3500/api/fooddrive/getfooddrives?limit=1
    const limit = parseInt(req.query.limit) || 9; //9 is the requesting number of requests to the page

    //localhost:3500/api/fooddrive/getfooddrives?oder=asc
    const sortDirection = req.query.order === 'asc' ? 1 : -1;

    //some more queries
    const fooddrives = await Fooddrive.find({
        ...(req.query.userId && { userId: req.query.userId }),
        ...(req.query.category && { category: req.query.category }),
        ...(req.query.status && { status: req.query.status }),
        ...(req.query.slug && { slug: req.query.slug }),
        ...(req.query.fooddriveId && { _id: req.query.fooddriveId }),
        ...(req.query.searchTerm && {
            //using or it alows us to search between two places
          $or: [ 
            { eventtitle: { $regex: req.query.searchTerm, $options: 'i' } }, //by regex tool it allows to search inside the title and from i, it tells that lowecase or uppercase is not important
            { eventdescription: { $regex: req.query.searchTerm, $options: 'i' } },
          ],
        }),
      })

      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);


      //to count the total number of fooddrive requests
    const totalFooddrives = await Fooddrive.countDocuments();

    //to count donation requests on last month
      //from today to last months
    const oneMonthAgo = new Date();

    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

        //last month's
        const lastMonthFooddrives = await Fooddrive.countDocuments({
            createdAt: { $gte: oneMonthAgo },
          });

          //responce
          res.status(200).json({
            fooddrives,
            totalFooddrives,
            lastMonthFooddrives,
          });

        } catch (error) {
            next(error);
    }
};

export const deletefooddrive = async (req, res, next) => {
    if (!req.user.isEventOrganiser) {
      return next(errorHandler(403, 'You are not allowed to delete this event'));
    }
    try {
      await Fooddrive.findByIdAndDelete(req.params.fooddriveId);
      res.status(200).json('The post has been deleted');
    } catch (error) {
      next(error);
    }
  }; 

  export const deletemyfooddrive = async (req, res, next) => {
    if (req.user.id !== req.params.userId) {
      return next(errorHandler(403, 'You are not allowed to delete this event'));
    }
    try {
      await Fooddrive.findByIdAndDelete(req.params.fooddriveId);
      res.status(200).json('The post has been deleted');
    } catch (error) {
      next(error);
    }
  }; 

  export const updatefstatus = async (req, res, next) => {
    if (!req.user.isEventOrganiser) {
      return next(errorHandler(403, 'You are not allowed to update the event status'));
    }
    try {
      const updatedFooddrive = await Fooddrive.findByIdAndUpdate(
        req.params.fooddriveId,
        {
          $set: {
            status: req.body.status,
          },
        },
        { new: true }
      );
      res.status(200).json(updatedFooddrive);
    } catch (error) {
      next(error);
    }
  }; 