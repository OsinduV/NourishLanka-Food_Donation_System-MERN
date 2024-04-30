import { errorHandler } from "../../utills/error.js";
import FrpDonation from "../models/frpDonation.model.js";
import FundRaisingPage from "../models/frp.model.js";
import mongoose from "mongoose";

export const createFrpDonation = async (req, res, next) => {
  if (!req.body.frpId || !req.body.privacy || !req.body.amount) {
    return next(errorHandler(403, "Please provide all required fields"));
  }

  const newFrpDonation = new FrpDonation({
    ...req.body,
    userId: req.user.id,
  });

  try {
    const savedFrpDonation = await newFrpDonation.save();
    res.status(201).json(savedFrpDonation);
  } catch (error) {
    next(error);
  }
};

export const getFrpDonations = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;

    const frpId = req.query.frpId;
    const frpIdObject = frpId ? new mongoose.Types.ObjectId(frpId) : null;

    const frpDonationsQuery = {
      ...(req.query.userId && { userId: req.query.userId }),
      ...(frpIdObject && { frpId: frpIdObject }),
      ...(req.query.frpDonationId && { _id: req.query.frpDonationId }),
      ...(req.query.amount && { amount: req.query.amount }),
      ...(req.query.privacy && { privacy: req.query.privacy }),
    };

    const frpDonations = await FrpDonation.find(frpDonationsQuery)
      .populate("frpId")
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    // // Calculate total amount for the given frpId
    // const totalAmountForFrpId = await FrpDonation.aggregate([
    //   { $match: frpDonationsQuery }, // Match documents based on query
    //   { $group: { _id: null, totalAmount: { $sum: "$amount" } } }, // Calculate sum of amount
    // ]);

    // const totalFrpDonationsAmount =
    //   totalAmountForFrpId.length > 0 ? totalAmountForFrpId[0].totalAmount : 0;

    const GotTotalFrpDonations = await FrpDonation.countDocuments(
      frpDonationsQuery
    );
    console.log("Query conditions:", frpDonationsQuery);
    const totalAmountForFrpId = await FrpDonation.aggregate([
      { $match: frpDonationsQuery }, // Match documents based on query
      { $group: { _id: null, totalAmount: { $sum: "$amount" } } }, // Calculate sum of amount
    ]);

    // Extract total amount from aggregation result
    const totalFrpDonationsAmount =
      totalAmountForFrpId.length > 0 ? totalAmountForFrpId[0].totalAmount : 0;

    const uniqueUserIds = await FrpDonation.distinct(
      "userId",
      frpDonationsQuery
    );
    const uniqueUsersCount = uniqueUserIds.length;

    const totalFrpDonations = await FrpDonation.countDocuments();

    res.status(200).json({
      frpDonations,
      totalFrpDonations,
      totalFrpDonationsAmount,
      totalAmountForFrpId,
      GotTotalFrpDonations,
      uniqueUsersCount,
    });
  } catch (error) {
    next(error);
  }
};

export const getTopFrpDonations = async (req, res, next) => {
  try {
    const frpDonationsQuery = {
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.frpId && { frpId: req.query.frpId }),
      ...(req.query.frpDonationId && { _id: req.query.frpDonationId }),
      ...(req.query.amount && { amount: req.query.amount }),
      ...(req.query.privacy && { privacy: req.query.privacy }),
    };
    const totalAmountForFrpId = await FrpDonation.aggregate([
      { $match: frpDonationsQuery }, // Match documents based on query
      { $group: { _id: null, totalAmount: { $sum: "$amount" } } }, // Calculate sum of amount
    ]);

    const totalAmountwithtopfrp = await FrpDonation.aggregate([
      {
        $lookup: {
          from: "fundraisingpages",
          localField: "frpId",
          foreignField: "_id",
          as: "frpIdData",
        },
      },
      { $unwind: "$frpIdData" }, // Unwind to destructure array
      {
        $group: {
          _id: "$frpId",
          totalAmount: { $sum: "$amount" },
          frpIdData: { $first: "$frpIdData" },
        },
      }, // Group by frpId and keep the first frpIdData
      { $sort: { totalAmount: -1 } }, // Sort in descending order
      { $limit: 5 } // Limit to 5 records
    ]);

    res.status(200).json({
      totalAmountwithtopfrp
    });
  } catch (error) {
    next(error);
  }
};
