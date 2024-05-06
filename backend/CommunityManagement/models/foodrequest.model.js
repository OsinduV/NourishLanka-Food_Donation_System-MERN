import mongoose from "mongoose";

const FoodRequestSchema = new mongoose.Schema(
    {   
        foodrequestID: {
            type: String,
            unique: true,
            required: true,
            default: () => `frid${Math.floor(1000 + Math.random() * 9000)}` // Generates a random ID starting with "frid" followed by 4 digits
        },
        userId: {
          type: String,
          required: true,
        },
        recipientname: {
          type: String,
          required: true,
        },
        district: {
          type: String,
          required: true,
          default: 'nodistrict',
        },
        category: {
            type: String,
            default: 'uncategorized',
            required:true,
        },
        position:{
          type: String,
        },
        porphanage:{
          type: String, 
        },
        pelders:{
          type: String,
        },
        pschool:{
          type: String,
        },
        incomeLevel:{
          type: String,
        }, 
        contactnumber:{
          type: String,
          required: true, 
        },
        nochildren:{
            type: String,
        },
        nomales:{
            type: String,
        },
        nofemales:{
            type: String,
        },
        email:{
            type: String,
        },
        address:{
            type: String,
        },
        image: {
          type: String,
        },
        zipcode: {
          type: String,
        },
        householdSize:{
          type: String,
        },
        content:{
            type:String,
        },
        status:{
          type:String,
          default:'Pending'
        },
        slug: {
          type: String,
          required: true,
          unique:true,
        },
      },
      { timestamps: true }
);

const FoodRequest = mongoose.model('FoodRequest', FoodRequestSchema);
export default FoodRequest;
