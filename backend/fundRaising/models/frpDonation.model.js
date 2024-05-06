import mongoose from "mongoose";

const frpDonationSchema = new mongoose.Schema(
  {
    frpId: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "FundRaisingPage"
    },
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "User"
    },
    amount: {
      type: Number,
      required: true,
    },
    privacy: {
      type: String,
      required: true,
    },
    note: {
      type: String,
    },
  },
  { timestamps: true }
);

//model name : first letter capital, mongodb automatically add the s to the name
const FrpDonation = mongoose.model("FrpDonation", frpDonationSchema);

export default FrpDonation;
