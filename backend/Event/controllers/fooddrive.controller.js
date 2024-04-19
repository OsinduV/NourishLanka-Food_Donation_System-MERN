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

        // Create new donation
        const newFooddrive = new Fooddrive({
            ...req.body,
            slug,
            userId: req.user.id,
        });

        // Save donation to database
        const savedFooddrive = await newFooddrive.save();

        // Respond with saved donation
        res.status(201).json(savedFooddrive);
    } catch (error) {
        // Pass error to error handling middleware
        next(error);
    }
};