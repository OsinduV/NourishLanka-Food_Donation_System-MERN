import { errorHandler } from "../../utills/error.js";
import Fooddrive from "../models/fooddrive.model.js";

//validate time
const validateTime = (time) => {
    const timeRegex = /^\d{1,2}(\:\d{1,2})?\s?(?:AM|PM|am|pm)$/;
    return timeRegex.test(time);
};

// Validate email format
const validateEmail = (email) => {
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
};

const isValidDate = (dateString) => {
  // Regular expression for dd/mm/yyyy format
  const dateFormat = /^\d{2}\/\d{2}\/2024$/;

  // Check if the date string matches the format
  if (!dateFormat.test(dateString)) {
      return false;
  }

  // Parse the date parts to integers
  const parts = dateString.split('/');
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);

  // Check if the date is valid
  if (year !== 2024 || month === 0 || month > 12 || day === 0 || day > 31) {
      return false;
  }

  // Check for months with 30 days
  if ([4, 6, 9, 11].includes(month) && day > 30) {
      return false;
  }

  // Check for February and leap years
  if (month === 2) {
      if (day > 29) {
          return false;
      }
      // February has 29 days in leap years, otherwise 28
      const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
      if (!isLeapYear && day > 28) {
          return false;
      }
  }

  return true;
};


//add validations to disabled buttons///////////////////////////
export const createfooddrive = async (req, res, next) => {
    try {
        // Check if the user information is available in the request
        if (!req.user || !req.user.id) {
            return next(errorHandler(401, 'User authentication failed'));
        }

         // Validate request body
         const requiredFields = ['eventtitle', 'dnid', 'donoremail', 'type', 'volunteers', 'eventdescription', 'foodbank'];
         if (requiredFields.some(field => !req.body[field])) {
             return next(errorHandler(400, 'Please provide all required fields'));
         }


        // If hosting as a group, validate organization name and website
        if (req.body.group === 'yes') {
          if (!req.body.ogname || !req.body.website) {
              return next(errorHandler(400, 'Organization name and website are required when hosting as a group'));
          }
      }

      // Validate based on food drive type
      if (req.body.type === 'onedaydrive') {
          const requiredFieldsOneday = ['eventdate', 'eventtimefrom', 'eventtimeto', 'eventlocation'];
          if (requiredFieldsOneday.some(field => !req.body[field])) {
              return next(errorHandler(400, 'Please provide all required fields for a one day food drive'));
          }
          // Validate event time format
          if (!validateTime(req.body.eventtimefrom) || !validateTime(req.body.eventtimeto)) {
            return next(errorHandler(400, 'Please provide a valid time format (e.g., "12:00 PM") for one day food drive'));
          }

          // Validate event date
          if (!isValidDate(req.body.eventdate)) {
            return next(errorHandler(400, 'Please provide a valid date (dd/mm/yyyy) for the event from current Year for one day food drive'));
          }

      } else if (req.body.type === 'longdrive') {
        const requiredFieldsLong = ['DateFrom', 'DateTo', 'eventtimelongfrom', 'eventtimelongto', 'eventlocationlong'];
        if (requiredFieldsLong.some(field => !req.body[field])) {
            return next(errorHandler(400, 'Please provide all required fields for a long drive food drive'));
        }

        // Validate event time format
        if (!validateTime(req.body.eventtimelongfrom) || !validateTime(req.body.eventtimelongto)) {
            return next(errorHandler(400, 'Please provide a valid time format (e.g., "12:00 PM") for long drive food drive'));
        }
         // Validate event date
        if (!isValidDate(req.body.DateFrom) || !isValidDate(req.body.DateTo)) {
             return next(errorHandler(400, 'Please provide a valid date (dd/mm/yyyy) for the event from current Year for long day food drive'));
        }
      }

     // Validate donor email format
          if (!validateEmail(req.body.donoremail)) {
            return next(errorHandler(400, 'Please provide a valid donor email address'));
        }

        // Validate volunteers to be a positive number
        const volunteers = parseInt(req.body.volunteers);
            if (isNaN(volunteers) || volunteers <= 0) {
                return next(errorHandler(400, 'Please provide a valid number of volunteers'));
        }

        // Validate minimum length of event description
        if (req.body['eventdescription'].length < 50) {
              return next(errorHandler(400, 'Event description must be at least 50 characters long'));
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
        ...(req.query.type && { type: req.query.type }),
        ...(req.query.status && { status: req.query.status }),
        ...(req.query.note && { status: req.query.note }),
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
    if (!req.user.isAdmin) {
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
    if (!req.user.isAdmin) {
      return next(errorHandler(403, 'You are not allowed to update the event status'));
    }
    try {
      const updatedFooddrive = await Fooddrive.findByIdAndUpdate(
        req.params.fooddriveId,
        {
          $set: {
            status: req.body.status,
            note: req.body.note,
          },
        },
        { new: true }
      );
      res.status(200).json(updatedFooddrive);
    } catch (error) {
      next(error);
    }
  }; 