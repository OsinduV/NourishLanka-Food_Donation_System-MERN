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

      } else if (req.body.type === 'longdrive') {
        const requiredFieldsLong = ['DateFrom', 'DateTo', 'eventtimelongfrom', 'eventtimelongto', 'eventlocationlong'];
        if (requiredFieldsLong.some(field => !req.body[field])) {
            return next(errorHandler(400, 'Please provide all required fields for a long drive food drive'));
        }

        // Validate event time format
        if (!validateTime(req.body.eventtimelongfrom) || !validateTime(req.body.eventtimelongto)) {
            return next(errorHandler(400, 'Please provide a valid time format (e.g., "12:00 PM") for long drive food drive'));
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
    // Parse query parameters
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === 'asc' ? 1 : -1;

    // Get selected date from query parameter
    const selectedDate = req.query.date;


    // Construct initial query object
    const query = {};

    // Append other query parameters
    if (req.query.userId) query.userId = req.query.userId;
    if (req.query.category) query.category = req.query.category;
    if (req.query.type) query.type = req.query.type;
    if (req.query.status) query.status = req.query.status; // Filter by status
    if (req.query.note) query.note = req.query.note;
    if (req.query.slug) query.slug = req.query.slug;
        if (req.query.type) query.type = req.query.type;

    // Search term query using regex
    if (req.query.searchTerm) {
      query.$or = [
        { eventtitle: { $regex: req.query.searchTerm, $options: 'i' } },
        { eventdescription: { $regex: req.query.searchTerm, $options: 'i' } },
      ];
    }

    // Apply date filtering
    if (selectedDate) {
      query.eventdate = {
        $gte: new Date(selectedDate),
        $lt: new Date(selectedDate).setDate(new Date(selectedDate).getDate() + 1),
      };
    }

    // Perform the query
    const fooddrives = await Fooddrive.find(query)
      .sort({ eventdate: sortDirection }) // Sort by event date
      .skip(startIndex)
      .limit(limit);

    // Respond with results
    res.status(200).json({ fooddrives });
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