import mongoose from "mongoose";

const FoodRequestSchema = new mongoose.Schema(
    {
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
        contactnumber:{
          type: String,
          required: true, 
        },
        nochildren:{
            type: String,
            required: true, 
          },
        nomales:{
            type: String,
            required: true, 
          },
        nofemales:{
            type: String,
            required: true, 
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
          unique: true,
        },
      },
      { timestamps: true }
    );
    
    const FoodRequest= mongoose.model('FoodRequest', FoodRequestSchema);
    
    export default FoodRequest;



