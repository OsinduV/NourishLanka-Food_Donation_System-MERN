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
        "https://images.pexels.com/photos/4968631/pexels-photo-4968631.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    bannerImage: {
      type: String,
      default:
        "https://images.pexels.com/photos/4968631/pexels-photo-4968631.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  },
  { timestamps: true }
);

//model name : first letter capital, mongodb automatically add the s to the name
const FRP = mongoose.model("FundRaisingPage", FRPSchema);

export default FRP;
