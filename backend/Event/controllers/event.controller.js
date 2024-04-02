import Event from "../models/event.model.js";
import { errorHandler } from "../../utills/error.js";

export const create = async (req, res, next) => {

        //check the person is event organiser or not
        if (!req.user.isEventOrganiser) {
            return next(errorHandler(403, 'You are not allowed to create a post'));
        }
        //if there is no title or ocontent for the publishing podt
        if (!req.body.title || !req.body.content) {
            return next(errorHandler(400, 'Please provide all required fields'))
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