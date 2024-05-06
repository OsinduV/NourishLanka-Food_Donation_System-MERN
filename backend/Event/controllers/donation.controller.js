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
      const startIndex = parseInt(req.query.startIndex) || 0;
      const limit = parseInt(req.query.limit) || 9;
      const sortDirection = req.query.order === 'asc' ? 1 : -1;

      // Parse the selectedDate from the query parameters
      const selectedDate = req.query.date;

      // Construct query object to filter donations
      const query = {
          ...(req.query.userId && { userId: req.query.userId }),
          ...(req.query.category && { category: req.query.category }),
          ...(req.query.status && { status: req.query.status }),
          ...(req.query.note && { status: req.query.note }),
          ...(req.query.slug && { slug: req.query.slug }),
          ...(req.query.donationId && { _id: req.query.donationId }),
          ...(req.query.searchTerm && {
              $or: [
                  { title: { $regex: req.query.searchTerm, $options: 'i' } },
                  { content: { $regex: req.query.searchTerm, $options: 'i' } },
              ],
          }),
      };

      // Add filter condition for selectedDate if provided
      if (selectedDate) {
          const startOfDay = new Date(selectedDate);
          startOfDay.setUTCHours(0, 0, 0, 0);

          const endOfDay = new Date(selectedDate);
          endOfDay.setUTCHours(23, 59, 59, 999);

          query.eventdate = { $gte: startOfDay, $lte: endOfDay };
      }

      const donations = await Donation.find(query)
          .sort({ eventdate: sortDirection })
          .skip(startIndex)
          .limit(limit);

      const totalDonations = await Donation.countDocuments(query);

      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      const lastMonthDonations = await Donation.countDocuments({
        eventdate: { $gte: oneMonthAgo },
      });

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