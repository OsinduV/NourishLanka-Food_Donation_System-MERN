import Event from "../models/event.model.js";
import { errorHandler } from "../../utills/error.js";

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


export const create = async (req, res, next) => {

        //check the person is event organiser or not
        if (!req.user.isAdmin) {
            return next(errorHandler(403, 'You are not allowed to create a post'));
        }

        // Validate request body
        const requiredFields = ['title', 'donorid', 'donoremail', 'content'];
        if (requiredFields.some(field => !req.body[field])) {
              return next(errorHandler(400, 'Please provide all required fields'));
        }

         // Validate donor email format
            if (!validateEmail(req.body.donoremail)) {
              return next(errorHandler(400, 'Please provide a valid donor email address'));
          }

         if (req.body.category === 'DonationEvent') {
               // Validate event date
              if (!isValidDate(req.body.date)) {
              return next(errorHandler(400, 'Please provide a valid date (dd/mm/yyyy) for the event from current Year for donation event'));
        }
                // Validate event time format
                if (!validateTime(req.body.time)) {
                  return next(errorHandler(400, 'Please provide a valid time format (e.g., "12:00 PM") for donation event'));
                }

                if (!req.body.location){
                  return next(errorHandler(400, 'Please provide location for donation event'));
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


        //a slug to split it and join it again by dash(-) and make it lowercase and also and remove anything that is not letters and numbers with the dash(-)
        const slug = req.body.title
        .split(' ')
        .join('-')
        .toLowerCase()
        .replace(/[^a-zA-Z0-9-]/g, '');

        const newEvent = new Event({
            ...req.body,
            slug,
            userId: req.user.id,
          });

        try {
            const savedEvent = await newEvent.save();
            res.status(201).json(savedEvent);
        } catch (error) {
            next(error);
        }
};

export const getevents = async (req, res, next) => {
    try {
    //localhost:4000/api/event/getevents?startIndex=1
    const startIndex = parseInt(req.query.startIndex) || 0;

    //localhost:4000/api/event/getevents?limit=1
    const limit = parseInt(req.query.limit) || 9; //9 is the requesting number of events to the page

    //localhost:4000/api/event/getevents?oder=asc
    const sortDirection = req.query.order === 'asc' ? 1 : -1;

    //some more queries
    const events = await Event.find({
        ...(req.query.userId && { userId: req.query.userId }),
        ...(req.query.category && { category: req.query.category }),
        ...(req.query.status && { status: req.query.status }),
        ...(req.query.slug && { slug: req.query.slug }),
        ...(req.query.eventId && { _id: req.query.eventId }),
        ...(req.query.searchTerm && {
            //using or it alows us to search between two places
          $or: [ 
            { title: { $regex: req.query.searchTerm, $options: 'i' } }, //by regex tool it allows to search inside the title and from i, it tells that lowecase or uppercase is not important
            { content: { $regex: req.query.searchTerm, $options: 'i' } },
          ],
        }),
      })

      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);


      //to count the total number of events
    const totalEvents = await Event.countDocuments();

    //to count events on last month
      //from today to last months
    const oneMonthAgo = new Date();

    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

        //last month's
        const lastMonthEvents = await Event.countDocuments({
            createdAt: { $gte: oneMonthAgo },
          });
      
          //responce
          res.status(200).json({
            events,
            totalEvents,
            lastMonthEvents,
          });

        } catch (error) {
            next(error);
    }
};

export const deleteevent = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to delete this event'));
  }
  try {
    await Event.findByIdAndDelete(req.params.eventId);
    res.status(200).json('The post has been deleted');
  } catch (error) {
    next(error);
  }
};


export const updateevent = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to update this post'));
  }
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.eventId,
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          category: req.body.category,
          image: req.body.image,
          date: req.body.date,
          time: req.body.time,
          location: req.body.location,
          donorid: req.body.donorid,
          donoremail: req.body.donoremail,
          status: req.body.status,
          category: req.body.category,
          type: req.body.type,
          eventdate: req.body.eventdate,
          eventlocation: req.body.eventlocation,
          eventtimefrom: req.body.eventtimefrom,
          eventtimeto: req.body.eventtimeto,
          DateFrom: req.body.DateFrom,
          DateTo: req.body.DateTo,
          eventtimelongfrom: req.body.eventtimelongfrom,
          eventtimelongto: req.body.eventtimelongto,
          eventlocationlong: req.body.eventlocationlong,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedEvent);
  } catch (error) {
    next(error);
  }
};