import FoodRequest from "../models/foodrequest.model.js";
import { errorHandler } from "../../utills/error.js";

export const createfoodrequest = async(req,res,next) =>{


    //check for the user accesbility
    if (!req.user || !req.user.id) {
        return next(errorHandler(401, 'User authentication failed'));
    }

    if (!req.body.recipientname|| !req.body.district) {
        return next(errorHandler(400, 'Please provide all required fields'));
      }

      //generating a slug

      const slug = req.body.recipientname
      .split(' ')
      .join('-')
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, '');
      
      //create new food request
      const newFoodRequest = new FoodRequest({
        ...req.body,
        slug,
        userId: req.user.id,
      })

      try {

        //save food request details to the database
        const savedFoodRequest = await newFoodRequest.save();
        //sending reponse with saved foodrequest
        res.status(201).json(savedFoodRequest);
      } catch (error) {
        //error handling using middleware
        next(error);
      }
}

export const deletemyfoodrequest = async (req, res, next) => {
   
  if (!req.user|| req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to delete this food request'));
  }
  try {
    await FoodRequest.findByIdAndDelete(req.params.myfoodrequestId)
    res.status(200).json('The food request has been deleted');
  } catch (error) {
    next(error);
  }
};


export const getfoodrequests = async (req, res, next) => {
  try {
    
   //start to fetch
    const startIndex = parseInt(req.query.startIndex) || 0;
    //setting limitattions
    const limit = parseInt(req.query.limit) || 9;
    //setting the order
    const sortDirection = req.query.order === 'asc' ? 1 : -1;

    const foodrequests = await FoodRequest.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.status && { status: req.query.status }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.foodrequestId && { _id: req.query.foodrequestId }),
      ...(req.query.searchTerm && {
        $or: [
          { district: { $regex: req.query.searchTerm, $options: 'i' } },//regex is going to search iniside
          { content: { $regex: req.query.searchTerm, $options: 'i' } },// i means lowee case or upper case
        ],
      }),
       
    })
    .sort({ updatedAt: sortDirection })
    .skip(startIndex)
    .limit(limit);

    const totalFoodRequests = await FoodRequest.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
    now.getFullYear(), 
    now.getMonth() - 1,
    now.getDate());
    const lastMonthFoodRequests = await FoodRequest.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      foodrequests,
      totalFoodRequests,
      lastMonthFoodRequests,
    });
  } catch (error) {
    next(error);
  }
};

export const updatefoodrequeststatus = async(req,res,next)=>{
    if (!req.user.isCommunityAdmin) {
      return next(errorHandler(403, 'You are not allowed to update the status of the foodrequest'));
    }
    try {
      const updatedFoodRequest = await FoodRequest.findByIdAndUpdate(
        req.params.foodrequestId,
        {
          $set: {
            status: req.body.status,//change the value
          },
        },
        { new: true }//get the new results
      );
      res.status(200).json(updatedFoodRequest);
    } catch (error) {
      next(error);
    }
}
