import { errorHandler } from "../../utills/error.js";
import FRP from "../models/frp.model.js";

export const createFRP = async (req, res, next) => {
  if (!req.body.content || !req.body.goal) {
    return next(errorHandler(403, "Please provide all required fields"));
  }

  const newFrp = new FRP({
    ...req.body,
    userId: req.user.id,
  });

  try {
    const savedFrp = await newFrp.save();
    res.status(201).json(savedFrp);
  } catch (error) {
    next(error);
  }
};
