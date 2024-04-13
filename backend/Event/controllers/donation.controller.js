import { errorHandler } from "../../utills/error.js";
import Donation from "../models/donation.model.js";

const validateTime = (eventtime) => {
    const timeRegex = /^\d{1,2}(\:\d{1,2})?\s?(?:AM|PM|am|pm)$/;
    return timeRegex.test(eventtime);
};

export const createdonation = async (req, res, next) => {
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

        // Validate event time
        if (!validateTime(req.body.eventtime)) {
            return next(errorHandler(400, 'Please provide a valid time (e.g., "12:00 PM")'));
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

