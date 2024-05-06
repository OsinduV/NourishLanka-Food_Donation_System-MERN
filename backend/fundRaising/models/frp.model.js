import mongoose from "mongoose";

const FRPSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      default: "<p>I've joined NourishLanka to help end hunger in Sri Lanka. No one should go without a meal, yet lot of people in Sri Lanaka face hunger. I created this fundraiser to help provide these much needed meals to our neighbors through the NourishLanka network of food banks and I'm asking you to join my in my cause.</p><br><p>It only takes a little to make a big difference. Will you help in my fight to end hunger?</p><br><p>Click on the Donate button above and let's end hunger together!</p>"
    },
    goal: {
      type: Number,
      required: true,
    },
    pageImage: {
      type: String,
      default:
        "https://firebasestorage.googleapis.com/v0/b/mern-community-nourish-lanka.appspot.com/o/1714459939102-drawn-clothing-donation-concept_23-2148832528.jpg?alt=media&token=2867e7ac-b0f9-458a-bfbb-7775608670f0",
    },
    bannerImage: {
      type: String,
      default:
        "https://firebasestorage.googleapis.com/v0/b/mern-community-nourish-lanka.appspot.com/o/1714459946569-view-kid-practicing-health-wellness-activity_23-2151401973.jpg?alt=media&token=e39ae35d-94e6-4285-abc7-4ef96182dac1",
    },
  },
  { timestamps: true }
);

//model name : first letter capital, mongodb automatically add the s to the name
const FRP = mongoose.model("FundRaisingPage", FRPSchema);

export default FRP;
