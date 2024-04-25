import mongoose from "mongoose";

const FoodRequestSchema = new mongoose.Schema(
    {   
      foodrequestId: {
        type: String,
        default: function () {
          return 'FR' + Date.now(); // Generating a unique ID based on the current timestamp
        },
        unique: true,
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
    
    const FoodRequest= mongoose.model('FoodRequest', FoodRequestSchema);
    
    export default FoodRequest;



