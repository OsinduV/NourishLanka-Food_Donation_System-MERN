import { errorHandler } from "../../utills/error.js";
import FRP from "../models/frp.model.js";

export const createFRP = async (req, res, next) => {
  if (!req.body.displayName || !req.body.goal) {
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

export const getfrps = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;
    const frps = await FRP.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.frpId && { _id: req.query.frpId }),
      ...(req.query.displayName && { displayName: req.query.displayName }),
      ...(req.query.searchTerm && {
        displayName: { $regex: req.query.searchTerm, $options: 'i' },
      }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalFrps = await FRP.countDocuments();

    res.status(200).json({
      frps,
      totalFrps,
    });
  } catch (error) {
    next(error);
  }
};


export const updatefrp = async (req, res, next) => {
  if (!req.user.isAdmin && req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to update this fundraising page'));
  }
  try {
    const updatedFrp = await FRP.findByIdAndUpdate(
      req.params.frpId,
      {
        $set: {
          displayName: req.body.displayName,
          content: req.body.content,
          goal: req.body.goal,
          pageImage: req.body.pageImage,
          bannerImage: req.body.bannerImage,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedFrp);
  } catch (error) {
    next(error);
  }
}

export const deletefrp = async (req, res, next) => {
  if (!req.user.isAdmin && req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to delete this fundraising page'));
  }
  try {
    await FRP.findByIdAndDelete(req.params.frpId);
    res.status(200).json('The fundraising page has been deleted');
  } catch (error) {
    next(error);
  }
}
