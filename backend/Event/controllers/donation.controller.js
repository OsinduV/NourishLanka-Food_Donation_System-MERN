import { errorHandler } from "../../utills/error.js";
import Donation from "../models/donation.model.js";

const validateTime = (eventtime) => {
    const timeRegex = /^\d{1,2}(\:\d{1,2})?\s?(?:AM|PM|am|pm)$/;
    return timeRegex.test(eventtime);
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


export const createdonation = async (req, res, next) => {
    try {
        // Check if the user information is available in the request
        if (!req.user || !req.user.id) {
            return next(errorHandler(401, 'User authentication failed'));
        }

         // Validate request body
         const requiredFields = ['eventtitle', 'dnid', 'donoremail', 'eventtime','attendees','volunteers'];
         if (requiredFields.some(field => !req.body[field])) {
             return next(errorHandler(400, 'Please provide all required fields'));
         }

         // Check if event description is filled
        if (!req.body['eventdescription']) {
            return next(errorHandler(400, 'Please enter event description'));
          }

        // Check if event budget is selected
        if (!req.body['budget'] || req.body['budget'] === 'Select Your Event Budget') {
          return next(errorHandler(400, 'Please select your event budget'));
        }


        // Validate event time
        if (!validateTime(req.body.eventtime)) {
            return next(errorHandler(400, 'Please provide a valid time (e.g., "12:00 PM")'));
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

        // Validate attendees to be a positive number
        const attendees = parseInt(req.body.attendees);
        if (isNaN(attendees) || attendees <= 0) {
            return next(errorHandler(400, 'Please provide a valid number of attendees'));
        }

        // Validate event date
        if (!isValidDate(req.body.eventdate)) {
            return next(errorHandler(400, 'Please provide a valid date (dd/mm/yyyy) for the event from current Year'));
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

        // Create new donation
        const newDonation = new Donation({
            ...req.body,
            slug,
            userId: req.user.id,
        });

        // Save donation to database
        const savedDonation = await newDonation.save();

        // Respond with saved donation
        res.status(201).json(savedDonation);
    } catch (error) {
        // Pass error to error handling middleware
        next(error);
    }
};

export const getdonations = async (req, res, next) => {
    try {
    //localhost:3500/api/donation/getdonations?startIndex=1
    const startIndex = parseInt(req.query.startIndex) || 0;

    //localhost:3500/api/donation/getdonations?limit=1
    const limit = parseInt(req.query.limit) || 9; //9 is the requesting number of requests to the page

    //localhost:3500/api/donation/getdonations?oder=asc
    const sortDirection = req.query.order === 'asc' ? 1 : -1;

    //some more queries
    const donations = await Donation.find({
        ...(req.query.userId && { userId: req.query.userId }),
        ...(req.query.category && { category: req.query.category }),
        ...(req.query.status && { status: req.query.status }),
        ...(req.query.note && { status: req.query.note }),
        ...(req.query.slug && { slug: req.query.slug }),
        ...(req.query.donationId && { _id: req.query.donationId }),
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


      //to count the total number of donation requests
    const totalDonations = await Donation.countDocuments();

    //to count donation requests on last month
      //from today to last months
    const oneMonthAgo = new Date();

    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

        //last month's
        const lastMonthDonations = await Donation.countDocuments({
            createdAt: { $gte: oneMonthAgo },
          });
      
          //responce
          res.status(200).json({
            donations,
            totalDonations,
            lastMonthDonations,
          });

        } catch (error) {
            next(error);
    }
};

export const deletedonation = async (req, res, next) => {
    if (!req.user.isAdmin) {
      return next(errorHandler(403, 'You are not allowed to delete this event'));
    }
    try {
      await Donation.findByIdAndDelete(req.params.donationId);
      res.status(200).json('The post has been deleted');
    } catch (error) {
      next(error);
    }
  };

  export const deletemydonation = async (req, res, next) => {
    if (req.user.id !== req.params.userId) {
      return next(errorHandler(403, 'You are not allowed to delete this event'));
    }
    try {
      await Donation.findByIdAndDelete(req.params.donationId);
      res.status(200).json('The post has been deleted');
    } catch (error) {
      next(error);
    }
  };

  export const updatedstatus = async (req, res, next) => {
    if (!req.user.isAdmin) {
      return next(errorHandler(403, 'You are not allowed to update the event status'));
    }
    try {
      const updatedDonation = await Donation.findByIdAndUpdate(
        req.params.donationId,
        {
          $set: {
            status: req.body.status,
            note: req.body.note,
          },
        },
        { new: true }
      );
      res.status(200).json(updatedDonation);
    } catch (error) {
      next(error);
    }
  };